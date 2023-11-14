const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    type: {
        enum: ['bilateral', 'group']
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;