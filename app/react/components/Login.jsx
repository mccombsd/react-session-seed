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
            <form className="form-signin" action="/user/login" method="post">
                <div className="form-group">
                    <label>User name</label>
                    <input className="form-control" name="username" type="text" placeholder="Enter user name"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" name="password" type="password" placeholder="Enter password"/>
                </div>
                <button className="btn">Login</button>
            </form>
        );
    }
});

module.exports = Login;