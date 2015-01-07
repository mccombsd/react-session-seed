/**
 * Created by Drew on 1/6/2015.
 */

var User = require('../schema/User');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function (email, done) {
        User.find({ email: email }).exec().then(err, user => done(err, user));
    });
};