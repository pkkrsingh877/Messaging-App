const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({users});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { getUsers };