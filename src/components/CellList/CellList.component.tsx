import React, { Fragment } from "react";
import { useTypedSelector } from "./../../hooks/useTypedSelector";
import { CellListItem } from "./../CellListItem/CellListItem.component";
import { AddCell } from "./../AddCell/AddCell.component";

interface CellListProps {}

export const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  return (
    <div>
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
