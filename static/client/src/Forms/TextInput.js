/**
 * Created by josh on 1/1/17.
 */
const React = require("react");

const TextInput = React.createClass({
    getInitialState: function() {
        return {error: false, errorMessage: ""};
    },
    getDefaultProps: function() {
        return {className: "", placeholder: ""}
    },
    render: function() {
        return (
            <div className = {"form-group" + (this.state.error ? " has-error" : "")}>
                {this.props.children}
                <input type = {this.props.type} className = {"form-control " + this.props.className}
                       onChange = {this.handleChange}
                       name={this.props.name}
                       placeholder = {this.props.placeholder}/>
                <span className = "help-block">{this.state.errorMessage}</span>
            </div>

        )
    },
    handleChange: function(e) {
        let validation = this.props.inputChangeFunction(e);
        if ("error" in validation) {
            this.state.error = true;
            this.state.errorMessage = validation["error"];
        }
        else {
            this.state.error = false;
            this.state.errorMessage = "";
        }
    }
});

module.exports = TextInput;