import { Action } from "../actions";
import { actionType } from "../actionTypes";
import produce from "immer";

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        err: string;
        code: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const bundlesReducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case actionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          err: "",
          code: "",
        };
        return state;
      case actionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          err: action.payload.bundle.err,
          code: action.payload.bundle.code,
        };
        return state;
      default:
        return state;
    }
  }
);

export default bundlesReducer;
