/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/8/2015
 */

var React = require('react'),
    ButtonList = require('./ButtonList.jsx');

var Private = React.createClass({
    render: function () {
        return (
            <div>
                <h2>This was private!</h2>
                <h3>{this.props.name}</h3>
                <ButtonList />
            </div>
        );
    }
});

module.exports = Private;