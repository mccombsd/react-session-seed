/**
 * Created by Drew on 1/10/2015.
 */

var Router = require('express').Router();

Router.get(
    [
        '/private'
    ],
    require('../templates/app')
);

module.exports = Router;
