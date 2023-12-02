const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUser = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.jwt;

        // If token exists then decode it and set req.user equals userid
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.userId
        }else{
            throw new Error('User not logged in!');
        }

        // Let the request continue by calling next() function
        next();
    } catch (error) {
        res.status(301).redirect('http://localhost:8000/auth/login');
    }
}

module.exports = verifyUser;