import { Cell } from "../../interfaces/cell";
import { Action } from "../actions";
import { actionType } from "../actionTypes";
import produce from "immer";

interface CellsState {
  data: {
    [key: string]: Cell;
  };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

const cellsReducer = produce(
  (state: CellsState = initialState, action: Action): CellsState | void => {
    switch (action.type) {
      case actionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case actionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;
      case actionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case actionType.INSERT_CELL_AFTER:
        return { ...state };
      case actionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: randomId(),
        };
        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
        }
        state.order.splice(foundIndex, 0, cell.id);
        return state;
      default:
        return { ...state };
    }
  }
);

const randomId = () => Math.random().toString(36).substring(2, 5);

export default cellsReducer;
