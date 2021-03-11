import { actionType } from "../actionTypes";
import { Direction } from "../../interfaces/directions";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  InsertCellBeforeAction,
} from "../actions";
import { CellTypes } from "../../interfaces/cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: actionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: actionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const deleteCell = (payload: string): DeleteCellAction => {
  return {
    type: actionType.DELETE_CELL,
    payload,
  };
};
export const insertCellBefore = (
  id: string,
  cellType: CellTypes
): InsertCellBeforeAction => {
  return {
    type: actionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
export const insertCellAfter = (
  id: string,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: actionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};
