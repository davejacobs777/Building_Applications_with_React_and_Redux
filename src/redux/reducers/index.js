import { combineReducers } from "redux";
// eslint-disable-next-line import/default
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
    courses,
    authors
});

export default rootReducer;
