/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/10/2015
 */

var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    Private = require('./components/Private.jsx'),
    Error = require('./components/Error.jsx'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var Private = React.createClass({
    mixins: [ RouterMixin, FluxMixin ],

    routes: {
        '/private': 'private'
    },

    render: function () {
        return (
            <div>
              {this.renderCurrentRoute()}
            </div>
        );
    },

    private: function () {
        return React.createElement(Private);
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

module.exports = Private;