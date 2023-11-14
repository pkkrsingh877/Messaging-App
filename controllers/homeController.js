const User = require('../models/user');

const search = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

module.exports = { search };