import { actionType } from "../actionTypes";
import { Direction } from "../../interfaces/directions";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Action,
} from "../actions";
import { CellTypes } from "../../interfaces/cell";
import { Dispatch } from "redux";
import bundle from "../../Bundler/Bundler";

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
export const insertCellAfter = (
  id: string | null,
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
export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: actionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);
    dispatch({
      type: actionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
