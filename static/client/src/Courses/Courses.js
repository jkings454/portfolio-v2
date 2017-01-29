/**
 * Created by josh on 1/12/17.
 */
const React = require("react");
import {Link} from 'react-router';

const Courses = React.createClass({
    getInitialState: function() {
        return {courses: []}
    },
    componentDidMount: function() {
        $.ajax({
            cache: true,
            url: "/api/v1/courses",
            dataType: "json",
            success: this.onCourseSuccess,
        })
    },
    render: function () {
        const courses = this.state.courses;
        return (
            <div className = "container">
                {
                    courses.map(function (course) {
                        return (
                            <div className = "course" key={course.id}>
                                <h1>{course.name}</h1>
                                <p>{course.description}</p>
                                <p><Link to={"/courses/" + course.id}>see more</Link></p>
                            </div>
                        );
                    })
                }
            </div>
        )
    },
    onCourseSuccess: function(data) {
        console.log("Success!");
        console.log("Type of data: " + typeof(data));
        console.log("Data: " + data);
        this.setState({courses: data})
    }
});

module.exports = Courses;