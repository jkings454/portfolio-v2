/**
 * Created by josh on 12/30/16.
 */
const React = require('react');
const ImageLoader = require("../ImageLoader");
import {Link} from "react-router";
// Renders a single project.

/*
    Possible/required props:
        * Title
        * Description
        * Project type
        * Expanded (Y/N)
    Depending on project type
        * Content
        * Image
        * Link? -- Possible link project type.
 */
const Project = React.createClass({
    render: function () {
        if (!this.props.expanded) {
            return (

                    <div className = "col-sm-4">
                        <div className = "panel panel-default project-unexpanded">
                            <div className ="panel-body">
                                <Link className="project" to={"/courses/" +
                                this.props.project.course_id + "/projects/" +
                                this.props.project.id}>
                                    <h1>{this.props.project.name}</h1>
                                    <p>{this.props.project.description}</p>
                                    {
                                        (this.props.project.type === "image_project") && (
                                            <ImageLoader
                                                src = {this.props.project.image_url}
                                                className="project-image-preview"
                                            />
                                        )
                                    }
                                </Link>
                            </div>
                        </div>
                        {
                            this.props.authenticated && (
                                <p>
                                    <a
                                        onClick ={() => (this.props.deleteCallback(this.props.project.id))}
                                        href="javascript:void(0)"
                                    >Delete</a>
                                </p>
                            )
                        }
                    </div>

            );
        }
        else {
            return (
                <div className="col-sm-12 project-expanded">
                    <h1>{this.props.project.name}</h1>
                </div>
            );
        }
    }
});

module.exports = Project;