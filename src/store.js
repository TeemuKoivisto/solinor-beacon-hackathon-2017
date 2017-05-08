import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux-immutablejs";

import { handleRequest } from "./middleware/api";

import beacon from "./reducers/beacon";

const combinedReducers = combineReducers({
  beacon,
});

const createStoreWithMiddleware = applyMiddleware(thunk, handleRequest)(createStore);

const store = createStoreWithMiddleware(combinedReducers);

export default store;