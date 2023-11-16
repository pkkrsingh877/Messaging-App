const mongoose = require('mongoose');

const groupConversationSchema = mongoose.Schema({
    messages: [
        {
            message: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const GroupConversation = mongoose.model('GroupConversation', groupConversationSchema);

module.exports = GroupConversation;