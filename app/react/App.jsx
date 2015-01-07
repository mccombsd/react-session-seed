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
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var App = React.createClass({
    mixins: [ RouterMixin, FluxMixin ],

    routes: {
        '/': 'home',
        '/itemlist': 'itemlist',
        '/login': 'login'
    },

    render: function () {
        console.log('App.render');
        return (
            <div>
              {this.renderCurrentRoute()}
            </div>
        );
    },

    home: function () {
        console.log('App.home');
        return React.createElement(Home);
    },

    itemlist: function () {
        return React.createElement(ItemList);
    },

    login: function () {
        return React.createElement(Login);
    },

    notFound: function (path) {
        return (
            <div>Path not found: {path}</div>
        );
    }
});

module.exports = App;