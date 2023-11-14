const User = require('../models/user');

const signup = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send(user);
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if( user.password == password ){
        res.send('User Authenticated');
    }else{
        res.send('Incorrect Username/Password');
    }
}

module.exports = { login, signup };