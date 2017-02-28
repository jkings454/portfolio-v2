/**
 * Created by josh on 1/12/17.
 *
 * TODO: implement a search bar.
 */
const React = require("react");
import {Link} from 'react-router';

const Courses = React.createClass({
    getInitialState: function() {
        return {courses: []}
    },
    componentDidMount: function() {
        this.setState({loading: true});
        $.ajax({
            cache: true,
            url: "/api/v1/courses",
            dataType: "json",
            success: this.onCourseSuccess,
        })
    },
    render: function () {
        const courses = this.state.courses;
        if (this.props.children){
            return (
                <div className="container">
                    {this.props.children}
                </div>);
        }
        else if (this.state.loading) {
            return (
                <div className = "container">
                    <div className="loader"></div>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    {
                        courses.map(function (course) {
                            return (
                                <div className="course" key={course.id}>
                                    <h1>{course.name}</h1>
                                    <p>{course.description}</p>
                                    <p><Link to={"/courses/" + course.id}>see more</Link></p>
                                </div>
                            );
                        })
                    }
                </div>
            )
        }
    },
    onCourseSuccess: function(data) {
        console.log("Success!");
        console.log("Type of data: " + typeof(data));
        console.log("Data: " + data);
        this.setState({courses: data, loading: false});
    }
});

module.exports = Courses;