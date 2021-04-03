import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

const isProduction = process.env.NODE_ENV === "production";

// [] means compulsory value
// <> means optional value
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Opens file for editing")
  .option("-p --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      // Gets base directory of the entered filename
      const dir = path.join(process.cwd(), path.dirname(filename));
      // Gets exact filename of the entered filename
      const fileName = path.basename(filename);
      await serve(Number(options.port), fileName, dir, !isProduction);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port}`
      );
    } catch (error) {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${options.port} is in use, try running on a different port`
        );
      } else {
        console.log(error.message);
      }
      process.exit(1);
    }
  });
