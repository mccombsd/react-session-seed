/**
 * Created by Drew on 1/10/2015.
 */

var superagent = require('superagent');

module.exports = {
    isAuthorized: function () {
        console.log('Authentication.isAuthorized');

        if (USER_DATA) {
            this._loggedIn = USER_DATA.auth;
        }
        else {
            this._loggedIn = this._loggedIn || false;
        }

        return this._loggedIn;
    },

    username: function () {
        if (USER_DATA) {
            this._username = USER_DATA.username;
        }
        else {
            this._username = this._username || '';
        }

        return this._username;
    },

    validPassword: function (password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;

        return regex.test(password);
    },

    validEmail: function (email) {
        var regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/;

        if (email) {
            return regex.test(email.toUpperCase());
        }

        return false;
    },

    passwordCriteria: function () {
        return 'Passords must be 8 to 15 chars long and can contain alphanumeric, at least one special char and capital letter';
    },

    validUsername: function (username) {
        var regex = /^[a-zA-Z0-9_-]{8,30}$/;

        if (username) {
            return regex.test(username);
        }
        return false;
    },

    usernameCriteria: function () {
        return 'Usernames must be 8 to 30 chars long and can contain alphanumeric, underscores and dashes';
    },

    validateUsername: function (username, callback) {
        if (callback) {
            superagent.get('/user/validateUsername', 'username=' + username, function (err, response) {
                callback(JSON.parse(response.text));
            })
        }
    }
}
