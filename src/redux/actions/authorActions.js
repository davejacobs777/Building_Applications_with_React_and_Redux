import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

//actions
export const loadAuthorsSuccess = authors => ({type: types.LOAD_AUTHORS_SUCCESS, authors});

//thunks
export const loadAuthors = () => dispatch =>
    authorApi.getAuthors()
        .then(authors => dispatch(loadAuthorsSuccess(authors)))
        .catch(error => { throw error });

