var React = require('react');
var ReactDOM = require('react-dom');

var Navbar = React.createClass({
    render: function () {
        var clickFunction = this.props.onClick;
        return (
            <nav className='navbar navbar-default navbar-static-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <a href='#' className='navbar-brand'
                            onClick={() => (clickFunction('index'))}>Josh Nichols</a>
                        <button type='button' className='navbar-toggle'
                            data-toggle='collapse' data-target='#my-collapse'>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                    </div>
                    <div className='collapse navbar-collapse' id='my-collapse'>
                        <ul className='nav navbar-nav navbar-right'>
                            <li><a href="#" key='index' onClick={() => (clickFunction("index"))}>Home</a></li>
                            {this.props.pages.map(function (page) {
                                return (<li><a href="#" key={page}
                                    onClick={() => (clickFunction(page))}>{page}</a></li>);
                            })}
                        </ul>
                    </div>
                </div>
            </nav>);
    },
});

module.exports = Navbar;