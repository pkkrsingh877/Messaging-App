const User = require('../models/user');

const getSignup = (req, res) => {
    try {
        res.status(200).render('auth/signup');
    } catch (error) {
        res.status(400).json(error);
    }
}

const postSignup = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send(user);
}

const getLogin = (req, res) => {
    try {
        res.status(200).render('auth/login');
    } catch (error) {
        res.status(400).json(error);
    }
}

const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if( user.password == password ){
        res.send('User Authenticated');
    }else{
        res.send('Incorrect Username/Password');
    }
}

module.exports = { getLogin, postLogin, getSignup, postSignup };