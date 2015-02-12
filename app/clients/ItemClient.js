/**
 * Created by Drew on 1/1/2015.
 */

var request = require('superagent'),
    Auth = require('./Authentication');

module.exports = {
    load: function (success, failure) {
        console.log('ItemClient.load');
        request.get('/api/loadItems', function (err, res) {
            if (err) {
                failure(err);
                return;
            }

            success(JSON.parse(res.text));
            console.log('ItemClient.load: ' + res.text);
        });
    },

    add: function (item, success, failure) {
        console.log('ItemClient.add');
        request
            .post('/api/addItem')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(item))
            .end(
                function (err, res) {
                    Auth.requestValidation(err, res,
                        function (err, res) {
                            if (err) {
                                failure(err);
                                return;
                            }

                            success();
                        }
                    );
                }
            );
    }
}