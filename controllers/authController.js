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
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username });
        if (user.password === password) {
            res.json({ id: user._id });
        } else {
            res.json({ error: 'Incorrect Username/Password' });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports = { getLogin, postLogin, getSignup, postSignup };