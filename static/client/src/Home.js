/**
 * Created by josh on 12/30/16.
 */
const React = require('react');
const Navbar = require('./Navbar');

const Home = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar currentPage = "index"/>
                <div className = "container">
                    <h1>This is the index page.</h1>
                </div>

            </div>
        )
    }
});

module.exports = Home;