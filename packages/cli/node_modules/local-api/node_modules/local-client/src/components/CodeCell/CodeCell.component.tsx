import { useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import { Preview } from "../Preview/Preview.component";
import Resizable from "../Resizable/Resizable.component";
import styles from "./CodeCell.module.scss";
import { Cell } from "../../interfaces/cell";
import { useActions } from "./../../hooks/useActions";
import { useTypedSelector } from "./../../hooks/useTypedSelector";
import { code } from "@uiw/react-md-editor/lib/cjs/commands";
import { useCummulativeCode } from "./../../hooks/useCummulativeCode";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cummulativeCode = useCummulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cummulativeCode);
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cummulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cummulativeCode, cell.id, createBundle]);
  return (
    <Resizable direction="vertical">
      <div className={styles.alignCodeCell}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className={styles.progressWrapper}>
            <div className={`progress-cover ${styles.progressCover}`}>
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} errorMessage={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
