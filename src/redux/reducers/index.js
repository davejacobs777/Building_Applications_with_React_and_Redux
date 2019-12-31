import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
// eslint-disable-next-line import/default
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
    courses,
    authors,
    apiCallsInProgress
});

export default rootReducer;
