import { Dispatch } from "redux";
import { Action } from "../actions";
import { actionType } from "../actionTypes";
import { saveCells } from "../actionCreators";
import { RootState } from "../reducers";

export const persistMiddleWare = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          actionType.MOVE_CELL,
          actionType.UPDATE_CELL,
          actionType.INSERT_CELL_AFTER,
          actionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
