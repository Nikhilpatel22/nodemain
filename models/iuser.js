const mongoose = require('mongoose');

const iuserSchema = new mongoose.Schema({
    instagram: {
        id: String,
        accessToken: String,
        full_name: String,
        username: String,
        profile_picture: String,
        bio: String,
        website: String,
        counts: {
          media: Number,
          follows: Number,
          followed_by: Number
        }
      }
});

module.exports = mongoose.model('iuser', iuserSchema);