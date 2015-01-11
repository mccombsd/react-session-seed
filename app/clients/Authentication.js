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

    login: function () {
        this._loggedIn = true;
    },

    logout: function () {
        this._loggedIn = false;
    }
}
