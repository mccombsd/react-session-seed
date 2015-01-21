/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/21/2015
 */

var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    ButtonToolbar = Bootstrap.ButtonToolbar,
    Button = Bootstrap.Button;

var ButtonList = React.createClass({
    render: function () {
        return (
            <ButtonToolbar>
                <Button bsStyle="info" href="/Private">Private</Button>
                <Button bsStyle="info" href="/Private2">Private 2</Button>
            </ButtonToolbar>
        );
    }
});

module.exports = ButtonList;