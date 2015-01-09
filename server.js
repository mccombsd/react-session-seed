/**
 * Created by Drew on 12/17/2014.
 */

var fs = require('fs'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    debug = require('debug')('DevMag'),
    React = require('react'),
    Plates = require('plates'),
    config = require('./config')('development'),
    mongoose = require('mongoose'),
    ItemModel = require('./schema/Item'),
    UserModel = require('./schema/User'),
    flash = require('connect-flash');

//var passport = require('passport'),
//    LocalStrategy = require('passport-local').Strategy,
var expressSession = require('express-session');

var app = express();

//Set up session and passport
app.use(expressSession({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false
}));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(flash());



//For requiring `.jsx` files as Node modules
require('node-jsx').install({extension: '.jsx'});

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'plates');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var App = require('./app/react/App.jsx');
var Fluxxor = require('fluxxor'),
    ItemStore = require('./app/stores/ItemStore'),
    AppActions = require('./app/actions/AppActions');

var passport = require('./passport/Setup')(app);
/*
passport.use('local', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            UserModel.findOne({ 'username' :  username },
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

passport.serializeUser(function(user, done) {
    console.log('passport.serializeUser: ' + user._id);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    console.log('passport.deserializeUser: ' + id);
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

app.post('/user/login',
    passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/willerror',
            failureFlash: true
        }
    )
);

function isValidPassword(user, password) {
    // Yes, this should be more secure

    console.log(user.password + ' === ' + password);
    console.log(user);
    return user.password === password;
};
*/

app.get('/api/loadItems', function (req, res) {
    console.log('get(/api/loadItems)');

    var pItems = ItemModel.find().exec();
    pItems.then(function (items) {
        var returnItems = items.map(function (item) {
            return { name: item.name};
        });

        res.json(returnItems);
    });
});

app.post('/api/addItem', function (req, res) {
    console.log('post(/api/addItem): ' + JSON.stringify(req.body));

    var newItem = new ItemModel();
    newItem.name = req.body.name;
    newItem.save();
});

// Render React on Server for all urls
app.get(['/', '/itemlist', '/login'],function(req,res){
    console.log('get(/): ' + req.originalUrl);

    var stores = {
        'ItemStore': new ItemStore()
    };
    var flux = new Fluxxor.Flux(stores, AppActions);
    var html = React.renderToString(React.createElement(App, {history: true, flux: flux, path: req.originalUrl}));

    renderHtml(res, html, "");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);

        var stores = {
            'ItemStore': new ItemStore()
        };
        var flux = new Fluxxor.Flux(stores, AppActions);
        var html = React.renderToString(React.createElement(App, {history: true, flux: flux, path: 'error' }));

        renderHtml(res, html, "");

        /*
        res.render('error', {
            message: err.message,
            error: err
        });
        */
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*
* Setup the app and listen
*/
app.set('port', process.env.PORT || config.port || 8000);

mongoose.connect(config.mongo.url);
var dbConnection = mongoose.connection;
var expressServer;

dbConnection.on('error', console.error.bind(console, 'connection error:'));

dbConnection.once('open', function () {
    console.log('Mongo DB connection made');
    expressServer = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + expressServer.address().port);
        console.log('Express server listening on port ' + expressServer.address().port);
    });
});


/*
* Handles injects the application before serving base html
*/
function renderHtml(res, appHtml, appData) {
    fs.readFile(
        path.join(__dirname, 'public', 'base.html'),
        { encoding: 'utf-8'},
        function(err, tmpl) {
            var html = Plates.bind(tmpl, {
                "App": appHtml  //, appData: 'APP_DATA = ' + JSON.stringify(appData)
            });

            res.set('Content-Type', 'text/html');
            res.send(html);
        }
    );
}