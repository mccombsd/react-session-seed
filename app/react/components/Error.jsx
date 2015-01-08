/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/7/2015
 */

var React = require('react');

var Error = React.createClass({
    render: function () {
        return (
            <h2>Oops, there was an error</h2>
        );
    }
});

module.exports = Error;