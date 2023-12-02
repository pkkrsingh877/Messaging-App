const express = require('express');
const router = express.Router();
const { getLogin, postLogin, getSignup, postSignup } = require('../controllers/authController');

router.post('/login', postLogin);

router.get('/login', getLogin);

router.post('/signup', postSignup);

router.get('/signup', getSignup);

module.exports = router;