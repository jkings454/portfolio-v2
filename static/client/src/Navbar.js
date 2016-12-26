/**
 * A basic Navbar template with room for links!
 */
const React = require('react');
const ReactDOM = require('react-dom');

const Navbar = React.createClass({
    render: function () {
        let pages = this.props.pages;
        return (
            <nav className='navbar navbar-default navbar-static-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <a href='/' className='navbar-brand'>Josh Nichols</a>
                        <button type='button' className='navbar-toggle'
                            data-toggle='collapse' data-target='#my-collapse'>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                    </div>
                    <div className='collapse navbar-collapse' id='my-collapse'>
                        <ul className='nav navbar-nav navbar-right'>
                            <li><a href = "/">Index</a></li>
                            {Object.keys(pages).map(function(key) {
                                return <li><a href = {pages[key]}>{key}</a></li>;
                            })}
                        </ul>
                    </div>
                </div>
            </nav>);
    },
});

module.exports = Navbar;