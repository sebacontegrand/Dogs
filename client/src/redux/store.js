

// import rootReducer from '../redux/reducer';
// import { legacy_createStore as createStore} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import {applyMiddleware, compose} from 'redux'
// import thunk from 'redux-thunk';

// const composeEnhancer = window.__REDUCER_DEVTOOLS_EXTENSION__|| compose;
// const store= createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

// export default store;

import rootReducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
// thunk nos permite trabajar con asincronismo en el front

export default store;
