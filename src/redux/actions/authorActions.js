import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import {apiCallError, beginApiCall} from "./apiStatusActions";

//actions
export const loadAuthorsSuccess = authors => ({type: types.LOAD_AUTHORS_SUCCESS, authors});

//thunks
export const loadAuthors = () => dispatch => {
    dispatch(beginApiCall());
    return authorApi.getAuthors()
        .then(authors => dispatch(loadAuthorsSuccess(authors)))
        .catch(error => {
            dispatch(apiCallError());
            throw error
        })
};

