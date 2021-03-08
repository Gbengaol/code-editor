import { useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import "bulmaswatch/superhero/bulmaswatch.min.css";

function App() {
  const [input, setInput] = useState<string | undefined>("");

  const ref = useRef<any>();
  const iframe = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.49/esbuild.wasm", // Get Esbuild from unpkg.com
    });
  };

  const onClick = async () => {
    if (!ref.current) return;

    iframe.current.srcDoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head>
      </head>
      <body>
      <div id="root">
      </div>
      <script>
        window.addEventListener("message", (event) => {
          try {
            eval(event.data)
          } catch (error) {
            document.querySelector("#root").innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>'+ error +'</div>';
            console.error(error);
          }
        }, false)
      </script>
      </body>
    </html>
  `;

  useEffect(() => {
    startService();
  }, []);
  return (
    <div>
      <CodeEditor
        initialValue="// Please enter your code here ..."
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <br />
      <button type="submit" onClick={onClick}>
        Submit
      </button>
      <br />
      <iframe
        sandbox="allow-scripts"
        ref={iframe}
        title="Preview"
        srcDoc={html}
      />
    </div>
  );
}

export default App;
