/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/8/2015
 */

var React = require('react');

var Private = React.createClass({
    render: function () {
        return (
            <div>
                <h2>This was private!</h2>
                <a href="/user/logout">Logout</a>
            </div>
        );
    }
});

module.exports = Private;