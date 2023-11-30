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

/** If friend request is sent then we need to make sure the friends array of both sender and 
 receiver is having each other's user.id **/

/**  Also make sure that friendRequestSent array of sender and friendRequestReceived array
 * of receiver does not have each other's user.id
 **/
const acceptFriendRequest = async (req, res) => {
    try {
        const { receiverId, senderId } = req.body;
        // save receiver's id to sender's friends array
        await User.findByIdAndUpdate(senderId, {
            $push: {
                friends: receiverId
            }
        });

        // Save sender's id to receiver's friend array
        await User.findByIdAndUpdate(receiverId, {
            $push: {
                friends: senderId
            }
        });

        // save receiver's id to sender's friends array
        await User.findByIdAndUpdate(senderId, {
            $push: {
                friendRequestSent: receiverId
            }
        });

        // Save sender's id to receiver's friend array
        await User.findByIdAndUpdate(receiverId, {
            $pull: {
                friendRequestReceived: senderId
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const rejectFriendRequest = async (req, res) => {
    try {
        const { receiverId, senderId } = req.body;
        // remove receiver's id from sender's friends array
        await User.findByIdAndUpdate(senderId, {
            $pull: {
                friendRequestSent: receiverId
            }
        });

        // remove sender's id from receiver's friend array
        await User.findByIdAndUpdate(receiverId, {
            $pull: {
                friendRequestReceived: senderId
            }
        });
        res.status(200).json({ "status": "success" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { sendFriendRequest, acceptFriendRequest, rejectFriendRequest };