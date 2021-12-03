var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:String},
});

module.exports = mongoose.model('data',dataSchema);