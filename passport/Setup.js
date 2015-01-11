/**
 * Created by Drew on 1/6/2015.
 */

var User = require('../schema/User'),
    Passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;;

module.exports = function (app) {
    app.use(Passport.initialize());
    app.use(Passport.session());

    var authorizeRoute = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log('setup.authorizeRoute: authorized');
            return next();
        }

        console.log('setup.authorizeRoute: NOT authorized');
        /*
        var returnUrl = req.originalUrl;
        if (returnUrl === "/login") {
            returnUrl = "/";
        }
        console.log('returnTo: ' + returnUrl)
        req.session.returnTo = returnUrl;
        */

        res.redirect('/login');
    };

    Passport.use('local',
        new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({ 'username' :  username },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    if (!user){
                        console.log('User Not Found with username: ' + username);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password'));
                    }

                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, user);
                }
            );
        })
    );

    Passport.serializeUser(function(user, done) {
        //console.log('passport.serializeUser: ' + user._id);
        done(null, user._id);
    });

    Passport.deserializeUser(function(id, done) {
        //console.log('passport.deserializeUser: ' + id);
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    app.post('/user/login',
        Passport.authenticate('local', {
                successRedirect: '/AuthorizeSession',
                failureRedirect: '/Login',
                /*
                Allows changing the URL to return to on success
                successReturnToOrRedirect: true,
                 */
                failureFlash: true
            }
        )
    );

    app.get('/user/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    function isValidPassword(user, password) {
        // Yes, this should be more secure
        return user.password === password;
    };

    return Passport;
};