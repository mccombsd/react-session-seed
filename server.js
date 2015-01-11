/**
 * Created by Drew on 12/17/2014.
 */

//For requiring `.jsx` files as Node modules
require('node-jsx').install({extension: '.jsx'});

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
var expressSession = require('express-session'),
    appRenderer = require('./routes/app');
var app = express();

//Set up session and passport
app.use(expressSession({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// view engine setup
app.set('view engine', 'plates');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('./passport/Setup')(app);

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
app.use(appRenderer);

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
        //TODO: This is ugly and should be nicer
        res.send(err.message);
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