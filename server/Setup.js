/**
 * Created by Drew on 1/6/2015.
 */

var User = require('../schema/User'),
    Passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),
    IsAuthorizedUser = require('./AuthorizeRoute').IsAuthorizedUser,
    Auth = require('../app/clients/Authentication');

module.exports = function (app) {
    app.use(Passport.initialize());
    app.use(Passport.session());

    var authorizeRoute = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    };

    Passport.use('login',
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

    Passport.use('register',
        new LocalStrategy({
                passReqToCallback : true
            },
            function(req, username, password, done) {
                findOrCreateUser = function(){
                    // find a user in Mongo with provided username

                    if (!Auth.validUsername(username)) {
                        return done(null, false,
                            req.flash('message','Username is not valid'));
                    }

                    User.findOne({ 'username': username },function(err, user) {
                        // In case of any error return
                        if (err){
                            //console.log('Error in SignUp: ' + err);
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            //console.log('User already exists');
                            return done(null, false,
                                req.flash('message','User Already Exists'));
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newUser = new User();
                            // set the user's local credentials
                            newUser.username = username;
                            newUser.password = bcrypt.hashSync(password);
                            //newUser.email = req.param('email');

                            // save the user
                            newUser.save(function(err) {
                                if (err){
                                    console.log('Error in Saving user: '+err);
                                    throw err;
                                }
                                //console.log('User Registration succesful');
                                return done(null, newUser);
                            });
                        }
                    });
                };

                // Delay the execution of findOrCreateUser and execute
                // the method in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            }
        )
    );

    Passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    Passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    app.post('/user/login',
        Passport.authenticate('login', {
                successRedirect: '/Private',
                failureRedirect: '/Login',
                /*
                 Allows changing the URL to return to on success
                 successReturnToOrRedirect: true,
                 */
                failureFlash: true
            }
        )
    );

    app.post('/user/register',
        Passport.authenticate('register', {
                successRedirect: '/Private',
                failureRedirect: '/Register',
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

    app.get('/user/validateUsername', function (req, res) {
        console.log('/user/validateUsername: ' + JSON.stringify(req.query.username));

        User.findOne({ 'username' :  req.query.username }, function (err, user) {
            var response = {
                valid: true,
                error: false
            }

            if (err) {
                response.error = true;
            }

            if (user) {
                response.valid = false;
            }

            res.send(JSON.stringify(response));
        });
    });

    function isValidPassword(user, password) {
        return bcrypt.compareSync(
            password,
            user.password
        );
    };

    return Passport;
};