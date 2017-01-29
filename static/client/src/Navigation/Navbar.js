/**
 * A basic Navbar template with room for links!
 */
const React = require('react');
import {Link} from 'react-router';

const NavItem = require("./NavItem");

const Navbar = React.createClass({
    getInitialState: function() {
        return {
            pages: {
                "Courses":"/courses",
                "Projects":"/projects"
        }}
    },
    render: function () {
        let pages = this.state.pages;
        return (
            <nav className='navbar navbar-default navbar-static-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <Link className = "navbar-brand" to="/">Josh Nichols</Link>
                        <button type='button' className='navbar-toggle'
                            data-toggle='collapse' data-target='#my-collapse'>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                    </div>
                    <div className='collapse navbar-collapse' id='my-collapse'>
                        <ul className='nav navbar-nav navbar-right'>
                            {Object.keys(pages).map(function(key) {
                                return <NavItem to={pages[key]} key={key}>{key}</NavItem>
                            })}
                        </ul>
                    </div>
                </div>
            </nav>);
    },
});

module.exports = Navbar;