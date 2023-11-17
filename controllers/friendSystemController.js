const User = require('../models/user');

const sendFriendRequest = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        // Save receiver's id to sender's friendRequestSent Array
        await User.findByIdAndUpdate(senderId, {
            $push: {
                friendRequestSent: receiverId
            }
        });

        // Save sender's id to receiver's friendRequestReceived Array
        await User.findByIdAndUpdate(receiverId, {
            $push: {
                friendRequestReceived: senderId
            }
        });
        res.status(200).json({ status: 'Request Sent' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const handleFriendRequest = async (req, res) => {
    // Code for handling Friend Request
}

module.exports = { sendFriendRequest, handleFriendRequest };