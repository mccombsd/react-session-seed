/**
 * @jsx React.DOM
 */
/**
 * Create by Drew 1/6/2015
 */

var React = require('react'),
    ButtonList = require('./ButtonList.jsx');

var Home = React.createClass({
    render: function () {

       return (
            <div>
                <h2>Home Component</h2>

                <ButtonList />
            </div>
        );
    }
});

module.exports = Home;