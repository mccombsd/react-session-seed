/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/8/2015
 */

var React = require('react'),
    Auth = require('../../clients/Authentication');

var Private = React.createClass({
    render: function () {
        return (
            <div>
                <h2>This was private!</h2>
                <h3>{this.props.name}</h3>
                <a className="btn btn-default" href="/private2">Private 2</a>
                <a className="btn btn-default" href="/user/logout">Logout</a>
            </div>
        );
    }
});

module.exports = Private;