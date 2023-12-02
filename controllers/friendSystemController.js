const User = require('../models/user');

const updateProfile = async (req, res) => {
    try {
        const { id, newUsername } = req.body;
        const user = await User.findByIdAndUpdate(id, { username: newUsername });
        res.status(200).json({ "status": "success" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

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

const getFriendRequests = async () => {
    try {
        const { id } = req.body;
        const requests = await User.findOne({ _id: id }).populate({
            path: 'friendReqestReceived',
            populate: {
                path: 'user',
                model: 'User'
            }
        });
        const users = requests.friendRequestReceived;
        res.status(200).render('user/friendRequestReceived', { users });
    } catch (error) {
        res.status(400).json({ "error": error });
    }
}

module.exports = { getFriendRequests, updateProfile, sendFriendRequest, acceptFriendRequest, rejectFriendRequest };