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
    Login = require('./components/Login.jsx'),
    Register = require('./components/Register.jsx'),
    Base = require('./Base.jsx'),
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
        '/register': 'register',
        '/private': 'private',
        '/private2': 'private2',
        '/error': 'error'
    },

    render: function () {
        return (
            <Base routeComponent={this.renderCurrentRoute()} />
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

    register: function () {
        return React.createElement(Register)
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