/**
 * @jsx React.DOM
 */
/**
 * Created by Drew 1/6/2015
 */

var React = require('react'),
    App = require('./App.jsx'),
    Fluxxor = require('fluxxor'),
    AppActions = require('../actions/AppActions'),
    ItemStore = require('../stores/ItemStore'),
    Stores = {
        'ItemStore': new ItemStore()
    };

var flux = new Fluxxor.Flux(Stores, AppActions);

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

React.render(React.createElement(App, {history: true, flux: flux}), document.getElementById("App"));