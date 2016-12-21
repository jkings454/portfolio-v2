var React = require("react")
var ReactDOM = require("react-dom")
var Navbar = require("./Navbar")

var App = React.createClass({
    render: function() {
        return (<Navbar/>);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));