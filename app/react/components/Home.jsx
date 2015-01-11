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
                    <a className="btn btn-default" href="/ItemList">Item List</a>
                    <a className="btn btn-default" href="/Login">Login</a>
                    <a className="btn btn-default" href="/Private">Private</a>
                </div>
            </div>
        );
    }
});

module.exports = Home;