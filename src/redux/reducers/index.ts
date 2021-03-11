import cellsReducer from "./cellsReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  cell: cellsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
