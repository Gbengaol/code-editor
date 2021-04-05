import React, { Fragment, useEffect } from "react";
import { useTypedSelector } from "./../../hooks/useTypedSelector";
import { CellListItem } from "./../CellListItem/CellListItem.component";
import { AddCell } from "./../AddCell/AddCell.component";
import styles from "./CellList.module.scss";
import { useActions } from "./../../hooks/useActions";

interface CellListProps {}

export const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  return (
    <div className={styles.cellList}>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <AddCell previousCellId={cell.id} />
          <CellListItem cell={cell} />
        </Fragment>
      ))}
    </div>
  );
};
