const mongoose = require('mongoose');

const bilateralConversationSchema = mongoose.Schema({
    messages: [
        {
            message: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const BilateralConversation = mongoose.model('BilateralConversation', bilateralConversationSchema);

module.exports = BilateralConversation;