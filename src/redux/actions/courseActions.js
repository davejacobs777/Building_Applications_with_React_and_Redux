import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

//actions
export const createCourse = course => ({type: types.CREATE_COURSE, course});

export const loadCourseSuccess = courses => ({type: types.LOAD_COURSES_SUCCESS, courses});

//thunks
export const loadCourses = () => dispatch =>
        courseApi.getCourses()
            .then(courses => dispatch(loadCourseSuccess(courses)))
            .catch(error => { throw error });

