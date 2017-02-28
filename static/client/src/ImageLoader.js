/**
 * Created by josh on 2/5/17.
 */
const React = require('react');

const ImageLoader = React.createClass({
    getInitialState: function() {
        return {};
    },
    getDefaultProps: function() {
        return {className: ""}
    },
    render: function() {
        return (
            <div>
                <img
                    src={this.props.src}
                    className={this.props.className}
                    onLoadStart={this.onLoadStart}
                    onLoad={this.onLoadEnd}
                />
                {
                    !this.state.loaded &&
                    <div className="loader"></div>
                }
            </div>
        )
    },
    onLoadStart: function() {
        this.setState({loaded: false})
    },
    onLoadEnd: function() {
        this.setState({loaded: true})
    }
});

module.exports = ImageLoader;