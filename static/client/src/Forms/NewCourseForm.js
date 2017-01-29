/**
 * Created by josh on 1/28/17.
 */
const React = require('react');
const TextInput = require('./TextInput');

const NewCourseForm = React.createClass({
    render: function() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <TextInput
                    inputChangeFunction={this.props.handleChange}
                    name="name"
                    className="form-control"
                >
                    <label>Course Name</label>
                </TextInput>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description"
                              onChange={this.props.handleChange}
                              rows="5"
                              className="form-control"
                    />
                </div>
            </form>
        );
    }
});

module.exports = NewCourseForm;