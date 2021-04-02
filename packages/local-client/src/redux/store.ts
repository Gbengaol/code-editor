import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { actionType } from "./actionTypes";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: actionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});
store.dispatch({
  type: actionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "text",
  },
});
store.dispatch({
  type: actionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});
store.dispatch({
  type: actionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "text",
  },
});
