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
        }

        // Let the request continue by calling next() function
        next();
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = verifyUser;