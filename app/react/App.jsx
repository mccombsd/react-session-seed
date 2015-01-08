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
    Login = require('./components/Login.jsx'),
    Error = require('./components/Error.jsx'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var App = React.createClass({
    mixins: [ RouterMixin, FluxMixin ],

    routes: {
        '/': 'home',
        '/itemlist': 'itemlist',
        '/login': 'login',
        '/error': 'error'
    },

    render: function () {
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