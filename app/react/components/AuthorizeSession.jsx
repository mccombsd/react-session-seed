/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/11/2015
 */

var React = require('react'),
    Auth = require('../../clients/Authentication');

var AuthorizeSession = React.createClass({
    render: function () {
        console.log('AuthorizeSession.render');
        if(window !== undefined) {
            Auth.login();
            window.location.replace('/private');
        }

        return (<h3>Authorize Session</h3>);
    }
});

module.exports = AuthorizeSession;