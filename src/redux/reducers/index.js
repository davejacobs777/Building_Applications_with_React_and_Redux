import { combineReducers } from "redux";
// eslint-disable-next-line import/default
import courses from "./courseReducer";

const rootReducer = combineReducers({
    courses
});

export default rootReducer;
