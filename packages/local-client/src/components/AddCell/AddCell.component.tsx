import React from "react";
import styles from "./AddCell.module.scss";
import { useActions } from "./../../hooks/useActions";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

export const AddCell: React.FC<AddCellProps> = ({
  previousCellId,
  forceVisible,
}) => {
  const { insertCellAfter } = useActions();
  return (
    <div
      className={`${styles.addCell} ${forceVisible ? styles.forceVisible : ""}`}
    >
      <div className={styles.addButtons}>
        <button
          className={`button is-rounded is-primary is-small ${styles.button}`}
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className={`button is-rounded is-primary is-small ${styles.button}`}
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};
