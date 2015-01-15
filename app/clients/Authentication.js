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

    validateUsername: function (username, callback) {
        if (callback) {
            superagent.get('/user/validateUsername', 'username=' + username, function (err, response) {
                callback(JSON.parse(response.text));
            })
        }
    }
}
