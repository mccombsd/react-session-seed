/**
 * @jsx React.DOM
 */
/**
 * Created by Drew 1/9/2015
 */

var React = require('react'),
    App = require('../react/App.jsx')
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

module.exports = function (path) {
    return React.createElement(
        App,
        {
            history: true,
            flux: flux,
            path: path
        }
    );
}