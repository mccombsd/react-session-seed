/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/11/2015
 */

var React = require('react'),
    cx = React.addons.classSet,
    Auth = require('../../clients/Authentication');

var Register = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
        return {
            username: null,
            password: null,
            password2: null,
            validUsername: false
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
        Auth.validateUsername(this.state.username, function (res) {
            that.setState({ validUsername: res.valid});
        });
    },

    render: function () {
        var disabled = 'disabled',
            passwordValid = this.validPassword(),
            password2Valid = this.validPassword2();

        if (passwordValid && password2Valid) {
            disabled = '';
        }

        var usernameClasses = cx({
            'form-group': true,
            'has-error': !this.state.validUsername,
            'has-success': this.state.validUsername
        });

        var passwordClasses = cx({
                'form-group': true,
                'has-error': !passwordValid,
                'has-success': passwordValid
            }
        );

        var password2Classes = cx({
                'form-group': true,
                'has-error': !password2Valid,
                'has-success': password2Valid
            }

        );

        return (
            <div>
                <form className="form-horizontal" action="/user/register" method="post">
                    <div className={usernameClasses}>
                        <label className="col-sm-2">User name</label>
                        <div className="col-sm-10">
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
                    <div className="form-group">
                        <label className="col-sm-2">Email</label>
                        <div className="col-sm-10">
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
                        <label className="col-sm-2">Password</label>
                        <div className="col-sm-10">
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
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                name="password2"
                                type="password"
                                placeholder="Re-enter password"
                                valueLink={this.linkState('password2')}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <button className="btn btn-default" disabled={disabled}>Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = Register;