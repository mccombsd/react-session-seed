/**
 * Created by Drew on 1/10/2015.
 */

var fs = require('fs'),
    path = require('path'),
    Plates = require('plates'),
    React = require('react');

var STATIC_BASE_HTML;

fs.readFile(
    path.join(__dirname, '../', 'public', 'base.html'),
    { encoding: 'utf-8'},
    function(err, template) {
        STATIC_BASE_HTML = template;
    }
);

function renderHtml(res, appHtml, userData) {
    var html = Plates.bind(
        STATIC_BASE_HTML, {
            "APP": appHtml,
            "USER_DATA": 'USER_DATA = ' + JSON.stringify(userData)
        }
    );

    res.set('Content-Type', 'text/html');
    res.send(html);
}


module.exports = function (req, res, next) {
    console.log('!appRender: ' + req.originalUrl);

    /*
    Isomorphic server render... Not working well with authentication
    var html = React.renderToString(
        require('../app/roots/app')(req.originalUrl)
    );*/

    var username = '';
    if (req.user) {
        username = req.user.username;
    }

    var html = "";
    renderHtml(
        res,
        html,
        {
            auth: req.isAuthenticated(),
            username: username
        }
    )
};
