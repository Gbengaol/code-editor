import { CellTypes, Cell } from "../../interfaces/cell";
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
export interface InsertCellAfterAction {
  type: actionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
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
export interface BundleStartAction {
  type: actionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}
export interface BundleCompleteAction {
  type: actionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}
export interface FetchCellsAction {
  type: actionType.FETCH_CELLS;
}
export interface FetchCellsCompleteAction {
  type: actionType.FETCH_CELLS_SUCCESS;
  payload: Cell[];
}
export interface FetchCellsErrorAction {
  type: actionType.FETCH_CELLS_ERROR;
  payload: string;
}
export interface SaveCellsErrorAction {
  type: actionType.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
