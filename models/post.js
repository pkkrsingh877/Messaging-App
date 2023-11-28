const mongoose = require('mongoose');
const User = require('../models/user');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    comments: [{
        type: String,
        required: [true, "Comment is required!"],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    }]
}, { timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;