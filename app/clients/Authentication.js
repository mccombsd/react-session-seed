/**
 * Created by Drew on 1/10/2015.
 */

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
    }
}
