import { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import { Preview } from "../Preview/Preview.component";
import bundler from "../../Bundler/Bundler";
import Resizable from "../Resizable/Resizable.component";
import styles from "./CodeCell.module.scss";

function CodeCell() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    setError("");
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [input]);
  return (
    <Resizable direction="vertical">
      <div className={styles.alignCodeCell}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="// Please enter your code here ..."
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} errorMessage={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
