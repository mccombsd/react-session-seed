/**
 * Created by Drew on 12/23/2014.
 */

var configs = {
    development: {
        port: '3000',
        mongo: {
            url: 'mongodb://localhost/react-session-seed',
            user: 'test',
            password: 'test'
        },
        secretKey: 'devsecretkey!'
    },

    production: {
        port: '4000',
        mongo: {
            url: 'mongodb://react-session-seed/react-session-seed',
            user: 'test',
            password: 'test'
        },
        secretKey: 'prodsecretkey!'
    }
};

module.exports = function (env) {

    if (!env) {
        env = 'development';
    }

    var config = configs[env];

    if (!config) {
        config = configs['developent'];
    }

    return config;
};