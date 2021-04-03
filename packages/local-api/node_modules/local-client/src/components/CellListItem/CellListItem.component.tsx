import React from "react";
import { Cell } from "../../interfaces/cell";
import CodeCell from "../CodeCell/CodeCell.component";
import TextEditor from "../TextEditor/TextEditor.component";
import { ActionBar } from "./../ActionBar/ActionBar.component";
import styles from "./CellListItem.module.scss";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const isCodeCell = cell.type === "code";
  return (
    <div className={styles.cellListItem}>
      {isCodeCell ? <CodeCell cell={cell} /> : <TextEditor cell={cell} />}
      <div className={isCodeCell ? styles.actionBarWrapper : ""}>
        <ActionBar id={cell.id} />
      </div>
    </div>
  );
};
