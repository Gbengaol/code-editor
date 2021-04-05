import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistMiddleWare } from "./middlewares/persist-middleware";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleWare, thunk)
);
