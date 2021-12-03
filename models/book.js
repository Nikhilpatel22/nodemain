var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},});

module.exports = mongoose.model('Book',bookSchema);