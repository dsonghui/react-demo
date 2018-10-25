import { combineReducers } from "redux";
import { reducer as commentApp } from "../Apps/commentApp/store";

const rootReducer = combineReducers({
    commentApp
});

export default rootReducer;
