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

function renderHtml(res, appHtml, appData) {
    var html = Plates.bind(
        STATIC_BASE_HTML, {
            "App": appHtml
            //, appData: 'APP_DATA = ' + JSON.stringify(appData)
        }
    );

    res.set('Content-Type', 'text/html');
    res.send(html);
}


module.exports = function (req, res, next) {
    console.log('!privateRender: ' + req.originalUrl);

    var html = React.renderToString(
        require('../app/roots/private')(req.originalUrl)
    );

    renderHtml(res, html, "");
};
