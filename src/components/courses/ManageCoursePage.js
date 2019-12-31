import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {loadCourses, saveCourse} from '../../redux/actions/courseActions';
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import {newCourse} from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify";

const ManageCoursePage = ({courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props}) => {
    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading course failed" + error)
            });
        } else {
            setCourse({...props.course})
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error)
            });
        }
    }, [props.course]);
    // the empty array as a 2nd argument to effect means the effect will run once
    // when the component mounts

    const handleChange = event => {
        const {name, value} = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    };

    const formIsValid = () => {
        const { title, authorId, category } = course;
        const errors = {};

        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Author is required";
        if (!category) errors.category = "Category is required";

        setErrors(errors);
        // Form is valid if the errors object has no error properties
        return Object.keys(errors).length === 0;
    };

    const handleSave = event => {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success("Course saved.");
            history.push('/courses')
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message })
        });
    };

    return authors.length === 0 || courses.length === 0 ? (
        <Spinner/>) : (<CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}/>);

};

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export const getCourseBySlug = (courses, slug) =>
    courses.find(course => course.slug === slug) || null;

// ownProps lets us access the component's props.
const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    }
};

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
// connect automatically passes dispatch in if we omit mapDispatchToProps here
