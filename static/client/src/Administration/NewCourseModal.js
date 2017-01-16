/**
 * Created by josh on 1/16/17.
 */
const React = require("react");

const NewCourseModal = React.createClass({
    render: function() {
        return (
            <div className = "modal fade" id="newCourseModal" tabIndex="-1" role="dialog">
                <div className = "modal-dialog" role="document">
                    <div className = "modal-content">
                        <div className = "modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                            <h4 className="modal-title">New Course</h4>
                        </div>
                        <div className = "modal-body">
                            <h3>Coming soon: a functional modal</h3>
                        </div>
                        <div className = "modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = NewCourseModal;