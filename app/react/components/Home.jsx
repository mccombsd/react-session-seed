/**
 * @jsx React.DOM
 */
/**
 * Create by Drew 1/6/2015
 */

var React = require('react');

var Home = React.createClass({

    render: function () {

       return (
            <div>
                <h2>Home Component</h2>
                <div>
                    <a href="/ItemList">Item List</a>
                    <a href="/Login">Login</a>
                </div>
            </div>
        );
    }
});

module.exports = Home;