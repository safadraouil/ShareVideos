/*
 * src/reducers/index.js
 */

import { combineReducers } from "redux";
import childReducer from "./childReducer";
import { createStore } from "redux";
//import and add more child reducers as your project builds.
const rootReducer = combineReducers({
  childReducer
});

// let initialStore = {};

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
