const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    friendRequestSent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    friendRequestReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;