const User = require('../models/user');

const getUser = async (req, res) => {
    // Return data for single user
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        res.status(200).render('home/user', { user });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const getSearch = (req, res) => {
    // send search page
    try {
        res.status(200).render('home/search');
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const postSearch = async (req, res) => {
    // If user has send empty string then print all users otherwise print single user
    try {
        const { username } = req.body;
        let users;
        if (username) {
            users = await User.find({ username: username });
        } else {
            users = await User.find({});
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { getSearch, postSearch, getUser };