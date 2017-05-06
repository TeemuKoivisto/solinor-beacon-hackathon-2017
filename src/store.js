import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux-immutablejs";

import { handleRequest } from "./middleware/api";

import beacon from "./reducers/beacon";

const combinedReducers = combineReducers({
  beacon,
});

/*
 * Resets all states of reducers when logging out
 */
// const rootReducer = (state, action) => {
//   if (action.type === "LOGOUT_USER") {
//     return combinedReducers(undefined, action);
//   }
//   return combinedReducers(state, action);
// };

const createStoreWithMiddleware = applyMiddleware(thunk, handleRequest)(createStore);

const store = createStoreWithMiddleware(combinedReducers);

export default store;