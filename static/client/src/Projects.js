/**
 * Created by josh on 12/29/16.
 */
const React = require('react');
const Navbar = require('./Navbar');

const Projects = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar currentPage = "Projects"/>
            </div>
        )
    }
});

module.exports = Projects;