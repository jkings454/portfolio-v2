/**
 * A basic Navbar template with room for links!
 */
const React = require('react');
import {Link} from 'react-router';

const Navbar = React.createClass({
    getInitialState: function() {
        return {
            pages: {
                "Blog":"/blog",
                "Projects":"/projects",
        }}
    },
    render: function () {
        let pages = this.state.pages;
        let currentPage = this.props.currentPage;
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
                                if (key == currentPage) {
                                    return (<li className="active" key={key}>
                                        <Link to={pages[key]}>{key}</Link>
                                    </li>)
                                }
                                return <li key={key}><Link to={pages[key]}>{key}</Link></li>;
                            })}
                        </ul>
                    </div>
                </div>
            </nav>);
    },
});

module.exports = Navbar;