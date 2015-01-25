/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/7/2015
 */

var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Panel = Bootstrap.Panel,
    Grid = Bootstrap.Grid,
    Col = Bootstrap.Col,
    Row = Bootstrap.Row,
    Input = Bootstrap.Input,
    ButtonToolbar = Bootstrap.ButtonToolbar,
    Button = Bootstrap.Button;

var Login = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    disableLogin: function () {
        return (
            this.state.username.length === 0 ||
            this.state.password.length === 0
        );
    },

    getInitialState: function () {
        return {
            username: "",
            password: ""
        };
    },

    render: function () {
        return (
            <form className="form-signin" action="/user/login" method="post">
                <Grid>
                    <Row className="form-group">
                        <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
                            <Panel>
                                <Input
                                    type="text"
                                    label="Username"
                                    placeholder="Enter username"
                                    name="username"
                                    valueLink={this.linkState('username')}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    valueLink={this.linkState('password')}
                                />
                                <ButtonToolbar>
                                    <Button type="submit" bsStyle="primary" disabled={this.disableLogin()}>Login</Button>
                                    <Button bsStyle="default" href="/register">Register</Button>
                                </ButtonToolbar>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </form>
        );
    }
});

module.exports = Login;