/**
 * @jsx React.DOM
 */
/**
 * Created by Drew 1/6/2015
 */

var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    Home = require('./components/Home.jsx'),
    ItemList = require('./components/ItemList.jsx'),
    Private = require('./components/Private.jsx'),
    AuthorizeSession = require('./components/AuthorizeSession.jsx'),
    Login = require('./components/Login.jsx'),
    Error = require('./components/Error.jsx'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    Auth = require('../clients/Authentication');

var App = React.createClass({
    mixins: [ RouterMixin, FluxMixin ],

    routes: {
        '/': 'home',
        '/itemlist': 'itemlist',
        '/login': 'login',
        '/private': 'private',
        '/private2': 'private2',
        '/authorizesession': 'authorizeSession',
        '/error': 'error'
    },

    render: function () {
        console.log('!!App.render: new route')
        return (
            <div>
              {this.renderCurrentRoute()}
            </div>
        );
    },

    home: function () {
        return React.createElement(Home);
    },

    itemlist: function () {
        return React.createElement(ItemList);
    },

    login: function () {
        return React.createElement(Login);
    },

    private: function () {

        if (!Auth.isAuthorized()) {
            console.log('app.private: NOT authorized');
            window.location.replace('/login');
            return;
        }

        console.log('app.private: authorized');
        return React.createElement(Private, { name: 'One'});
    },

    private2: function () {

        if (!Auth.isAuthorized()) {
            console.log('app.private: NOT authorized');
            window.location.replace('/login');
            return;
        }

        console.log('app.private: authorized');
        return React.createElement(Private, { name: 'Two'});
    },

    authorizeSession: function () {
        console.log('App.authorizeSession');
        return React.createElement(AuthorizeSession);
    },

    error: function () {
        return React.createElement(Error);
    },

    notFound: function (path) {
        return (
            <div>Path not found: {path}</div>
        );
    }
});

module.exports = App;