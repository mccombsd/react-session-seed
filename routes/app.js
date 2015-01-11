/**
 * Created by Drew on 1/8/2015.
 */

var Router = require('express').Router();

Router.get(
    [
        '/',
        '/itemlist',
        '/login',
        '/private',
        '/authorizesession'
    ],
    require('../templates/app')
);

module.exports = Router;
