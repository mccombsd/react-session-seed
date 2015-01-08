/**
 * Create by Drew on 1/6/2015
 */

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//Define document schema here
var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdOn: { type: Date, default: Date.now }
});

//Define instance methods here

//Define static methods here

module.exports = Mongoose.model('User', UserSchema);