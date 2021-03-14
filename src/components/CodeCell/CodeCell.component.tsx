import { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import { Preview } from "../Preview/Preview.component";
import bundler from "../../Bundler/Bundler";
import Resizable from "../Resizable/Resizable.component";
import styles from "./CodeCell.module.scss";
import { Cell } from "../../interfaces/cell";
import { useActions } from "./../../hooks/useActions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const { updateCell } = useActions();

  useEffect(() => {
    setError("");
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [cell.content]);
  return (
    <Resizable direction="vertical">
      <div className={styles.alignCodeCell}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} errorMessage={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
