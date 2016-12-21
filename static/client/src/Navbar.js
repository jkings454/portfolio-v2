var React = require('react');
var ReactDOM = require('react-dom');

var Navbar = React.createClass({
    render: function() {
        return (
            <nav className = 'navbar navbar-default navbar-static-top'>
                <div className='container'>
                    <h1>Hello world!</h1>
                </div>
            </nav>);
    },
});

module.exports = Navbar;