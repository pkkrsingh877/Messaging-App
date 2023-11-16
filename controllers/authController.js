const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getSignup = (req, res) => {
    try {
        res.status(200).render('auth/signup');
    } catch (error) {
        res.status(400).json(error);
    }
}

const postSignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        await User.login(username, password);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // 7 days
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json({ user: user._id });
    } catch (error) {
        console.log(error);
    }
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
    try {
        const user = await User.login(username, password);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // 7 days
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const loginError = loginErrorHandler(err);
        res.status(400).json({ loginError });
    }
}

module.exports = { getLogin, postLogin, getSignup, postSignup };