import React, {Fragment} from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
    componentDidMount = () => {
        const {courses, authors, actions} = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading course failed" + error)
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed" + error)
            });
        }
    };

    render() {
        return (
            <Fragment>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses}/>
            </Fragment>
        );
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = ({courses, authors}) => {
    return {
        courses: authors.length === 0 ? [] : courses.map(course => {
            return {
                ...course,
                authorName: authors.find(a => a.id === course.authorId).name
            }
        }),
        authors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// connect automatically passes dispatch in if we omit mapDispatchToProps here
