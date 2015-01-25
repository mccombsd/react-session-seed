/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/11/2015
 */

var React = require('react'),
    cx = React.addons.classSet,
    Auth = require('../../clients/Authentication'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    Label = Bootstrap.Label,
    Grid = Bootstrap.Grid,
    Row = Bootstrap.Row,
    Col = Bootstrap.Col,
    Panel = Bootstrap.Panel,
    ButtonToolbar = Bootstrap.ButtonToolbar,
    Button = Bootstrap.Button,
    OverlayTrigger = Bootstrap.OverlayTrigger,
    Popover = Bootstrap.Popover;

var Register = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
        return {
            username: null,
            validUsername: false,
            password: null,
            password2: null,
            email: null,
            validEmail: false
        };
    },

    validPassword: function () {
        return (
            this.state.password !== undefined &&
            this.state.password !== null &&
            Auth.validPassword(this.state.password)
        );
    },

    validPassword2: function () {
        return (
            this.state.password2 !== undefined &&
            this.state.password2 !== null &&
            this.state.password === this.state.password2
        );
    },

    validateUsername: function () {
        var that = this;

        if (!this.state.username) {
            return false;
        }
        Auth.validateUsername(this.state.username, function (res) {
            that.setState({ validUsername: res.valid});
        });
    },

    validateEmail: function () {
        return Auth.validEmail(this.state.email);
    },

    usernameStyle: function () {
        if (!this.state.validUsername && this.state.username)
            return 'error';
        if (this.state.validUsername && this.state.username)
            return 'success';
        return '';
    },

    emailStyle: function () {
        if (!this.validateEmail() && this.state.email)
            return 'error';
        if (this.validateEmail() && this.state.email)
            return 'success';
        return '';
    },

    passwordStyle: function () {
        if (!this.validPassword() && this.state.password)
            return 'error';
        if (this.validPassword() && this.state.password)
            return 'success';
        return '';
    },

    password2Style: function () {
        if (!this.validPassword2() && this.state.password2)
            return 'error';
        if (this.validPassword2() && this.state.password2)
            return 'success';
        return '';
    },

    render: function () {
        var signupDisabled = 'disabled',
            passwordValid = this.validPassword(),
            password2Valid = this.validPassword2(),
            emailValid = this.validateEmail();

        if (passwordValid &&
            password2Valid &&
            this.state.validUsername &&
            emailValid
        ) {
            signupDisabled = '';
        }

        return (
            <form className="form-signin" action="/user/register" method="post">
                <Grid>
                    <Row className="form-group">
                        <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
                            <Panel>
                                <OverlayTrigger
                                    trigger="hover"
                                    delayShow={300}
                                    delayHide={300}
                                    placement="bottom"
                                    overlay={<Popover title="Username rules">{Auth.usernameCriteria()}</Popover>}
                                >
                                    <Input
                                        name="username"
                                        type="text"
                                        label="Username"
                                        placeholder="Enter username"
                                        bsStyle={this.usernameStyle()}
                                        valueLink={this.linkState('username')}
                                        onBlur={this.validateUsername}
                                    />
                                </OverlayTrigger>
                                <Input
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="email@domain.com"
                                    bsStyle={this.emailStyle()}
                                    valueLink={this.linkState('email')}
                                />
                                <OverlayTrigger
                                    trigger="hover"
                                    delayShow={300}
                                    delayHide={300}
                                    placement="bottom"
                                    overlay={<Popover title="Password rules">{Auth.passwordCriteria()}</Popover>}
                                >
                                    <Input
                                        name="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        bsStyle={this.passwordStyle()}
                                        valueLink={this.linkState('password')}
                                    />
                                </OverlayTrigger>
                                <Input
                                    name="password2"
                                    type="password"
                                    placeholder="Re-enter password"
                                    bsStyle={this.password2Style()}
                                    valueLink={this.linkState('password2')}
                                />
                                <ButtonToolbar>
                                    <Button bsStyle="primary" type="submit" disabled={signupDisabled}>Sign up</Button>
                                </ButtonToolbar>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </form>
        );
    }
});

module.exports = Register;