const mongoose = require('mongoose');

const fuserSchema = new mongoose.Schema({
    uid: String,  
    email: String,
    name: String,
    gender: String,
    pic: String
});

module.exports = mongoose.model('fuser', fuserSchema);