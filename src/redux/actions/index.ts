import { CellTypes } from "../../interfaces/cell";
import { actionType } from "../actionTypes/index";

interface MoveCellAction {
  type: actionType.MOVE_CELL;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}
interface DeleteCellAction {
  type: actionType.DELETE_CELL;
  payload: string;
}
interface InsertCellBeforeAction {
  type: actionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}
interface InsertCellAfterAction {
  type: actionType.INSERT_CELL_AFTER;
  payload: {
    id: string;
    type: CellTypes;
  };
}
interface UpdateCellAction {
  type: actionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | InsertCellBeforeAction
  | UpdateCellAction;
