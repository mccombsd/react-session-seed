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
    Col = Bootstrap.Col,
    Panel = Bootstrap.Panel;

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

        var usernameClasses = cx({
            'form-group': true,
            'has-error': !this.state.validUsername && this.state.username,
            'has-success': this.state.validUsername && this.state.username
        });

        var emailClasses = cx({
            'form-group': true,
            'has-error': !emailValid && this.state.email,
            'has-success': emailValid && this.state.email
        });

        var passwordClasses = cx({
            'form-group': true,
            'has-error': !passwordValid && this.state.password,
            'has-success': passwordValid && this.state.password
        });

        var password2Classes = cx({
            'form-group': true,
            'has-error': !password2Valid && this.state.password2,
            'has-success': password2Valid && this.state.password2
        });

        return (
            <Panel>
                <form className="form-horizontal" action="/user/register" method="post">
                    <div className={usernameClasses}>
                        <label className="col-sm-2 col-sm-offset-2">User name</label>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                name="username"
                                type="text"
                                placeholder="Enter user name"
                                valueLink={this.linkState('username')}
                                onBlur={this.validateUsername}
                            />
                        </div>
                    </div>
                    <div className={emailClasses}>
                        <label className="col-sm-2 col-sm-offset-2">Email</label>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                placeholder="email@domain.com"
                                valueLink={this.linkState('email')}
                            />
                        </div>
                    </div>
                    <div className={passwordClasses}>
                        <label className="col-sm-2 col-sm-offset-2">Password</label>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                valueLink={this.linkState('password')}
                            />
                        </div>
                    </div>
                    <div className={password2Classes}>
                        <div className="col-sm-2 col-sm-offset-2"></div>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                name="password2"
                                type="password"
                                placeholder="Re-enter password"
                                valueLink={this.linkState('password2')}
                            />
                        </div>
                    </div>
                    <div className="col-sm-2 col-sm-offset-2"></div>
                    <div className="col-sm-4">
                        <button className="btn btn-primary" disabled={signupDisabled}>Sign up</button>
                    </div>
                </form>
            </Panel>
        );
    }
});

module.exports = Register;