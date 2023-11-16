const User = require('../models/user');
const jwt = require('jsonwebtoken');
const loginErrorHandler = require('../functions/loginErrorHandler');
const signupErrorHandler = require('../functions/signupErrorHandler');

const getSignup = (req, res) => {
    try {
        res.status(200).render('auth/signup');
    } catch (error) {
        res.status(400).json(error);
    }
}

/*
The postSignup function gets username and password from form submission and then we create
a user with received username and hashed password. hashing is done in when we are trying 
to create new user and User.pre function is called. That's when salt is generated and
password is hashed. then we create token, sign it, send it to users browser. finally we
send the user id to the users browser in json format
 */

const postSignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        await User.login(username, password);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // 7 days
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json({ userId: user._id });
    } catch (error) {
        const signupError = signupErrorHandler(error);
        res.status(400).json({ signupError });
    }
}

const getLogin = (req, res) => {
    try {
        res.status(200).render('auth/login');
    } catch (error) {
        res.status(400).json(error);
    }
}

/*
postLogin function call User.login function on the mongoose schema itself and then 
verifies if username and password is correct. then we create token using jwt and sign
it with userid as payload and our secret code. then we send the token to the browser of
person who is trying to login. Finally we send the userid of user to their browser in
json format so we can use it to send them to profile page.
*/
const postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // 7 days
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json({ userId: user._id });
    } catch (error) {
        const loginError = loginErrorHandler(error);
        res.status(400).json({ loginError });
    }
}

module.exports = { getLogin, postLogin, getSignup, postSignup };