import { CellTypes } from "../../interfaces/cell";
import { Direction } from "../../interfaces/directions";
import { actionType } from "../actionTypes/index";

export interface MoveCellAction {
  type: actionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface DeleteCellAction {
  type: actionType.DELETE_CELL;
  payload: string;
}
export interface InsertCellBeforeAction {
  type: actionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}
export interface InsertCellAfterAction {
  type: actionType.INSERT_CELL_AFTER;
  payload: {
    id: string;
    type: CellTypes;
  };
}
export interface UpdateCellAction {
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
