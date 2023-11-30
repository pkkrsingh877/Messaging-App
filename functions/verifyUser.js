const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUser = async (req, res, next) => {
    try {
        console.log(req);
        const token = req.cookies.jwt;
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded.id)
        }
        next();
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = verifyUser;