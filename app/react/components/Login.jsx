/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/7/2015
 */

var React = require('react');

var Login = React.createClass({
    render: function () {
        return (
            <form className="form-group" action="/user/login" method="post">
                <input className="form-control" name="username" type="text"/>
                <input className="form-control" name="password" type="password"/>
                <button className="btn">Login</button>
            </form>
        );
    }
});

module.exports = Login;