/**
 * Create by Drew on 12/26/2014
 */

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//Define document schema here
var ItemSchema = new Schema({
    name: String,
    description: String,
    createdOn: { type: Date, default: Date.now }
});

//Define instance methods here

//Define static methods here

module.exports = Mongoose.model('Item', ItemSchema);