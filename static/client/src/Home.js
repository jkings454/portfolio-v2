/**
 * Created by josh on 12/30/16.
 */
const React = require('react');

const Home = React.createClass({
    render: function() {
        return (
            <div className = "container">
                <div className="page-header">
                    <h1>Welcome to my portfolio!</h1>
                </div>
                <p>As you might have noticed, it's a little barebones right now, that's because this site is still
                very much in development. This means that thing's won't look very pretty for at least a couple of
                months, and that there's going to be a load of bugs!</p>
                <p>Speaking of which, if you notice any bugs and you know how to use GitHub, please submit an
                issue to this site's <a href="https://github.com/jkings454/portfolio-v2">GitHub page</a>, so that
                I can fix it.</p>
                <p>Anyways, this is a portfolio site that I built in order to house my school projects! It's all
                organized and stuff.</p>
                <p>But, uh, yeah. That's about it for now. I'll fix this page later.</p>
            </div>
        )
    }
});

module.exports = Home;