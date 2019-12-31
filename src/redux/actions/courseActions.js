import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import {apiCallError, beginApiCall} from "./apiStatusActions";

//actions
export const loadCourseSuccess = courses => ({type: types.LOAD_COURSES_SUCCESS, courses});

export const updateCourseSuccess = course => ({type: types.UPDATE_COURSE_SUCCESS, course});

export const createCourseSuccess = course => ({type: types.CREATE_COURSE_SUCCESS, course});

export const deleteCourseOptimistic = course => ({type: types.DELETE_COURSE_OPTIMISTIC, course});

//thunks
export const loadCourses = () => dispatch => {
    dispatch(beginApiCall());
    return courseApi.getCourses()
        .then(courses => dispatch(loadCourseSuccess(courses)))
        .catch(error => {
            dispatch(apiCallError());
            throw error
        });
};

export const saveCourse = course =>
    // getState returns the redux store state
    (dispatch, getState) => {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id
                ? dispatch(updateCourseSuccess(savedCourse))
                : dispatch(createCourseSuccess(savedCourse));
        })
            .catch(error => {
                dispatch(apiCallError());
                throw error
            });
    };


export const deleteCourse = course => dispatch => {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
};
