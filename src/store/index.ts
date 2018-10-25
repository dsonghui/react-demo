import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk'
import AppReducer from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension' // eslint-disable-line

const store = createStore(AppReducer, compose(composeWithDevTools(applyMiddleware(
    thunk
))));

export default store;
