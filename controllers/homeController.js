const User = require('../models/user');

const getSearch = (req, res) => {
    try {
        res.status(200).render('home/search');
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

// If user has send empty string then print all users
const postSearch = async (req, res) => {
    try {
        const { username } = req.body;
        if(username){
            const users = await User.find({ username: username });
        }else{
            const users = await User.find({});
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { getSearch, postSearch };