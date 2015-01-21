/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/15/2015
 */

var React = require('react'),
    Navigation = require('./components/Navigation.jsx');


var Base = React.createClass({
    render: function () {
        return (
            <div>
                <Navigation />

                <div className="container">
                    {this.props.routeComponent}
                </div>
            </div>
        );
    }
});

module.exports = Base;