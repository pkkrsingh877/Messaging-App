const User = require('../models/user');

const getSearch = (req, res) => {
    try {
        res.status(200).render('home/search');
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const postSearch = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { getSearch, postSearch };