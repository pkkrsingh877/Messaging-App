const express = require('express');
const router = express.Router();
const { getLogin, postLogin, getSignup, postSignup } = require('../controllers/authController');
const { getSearch, postSearch } = require('../controllers/homeController');

router.post('/search', postSearch);

router.get('/search', getSearch);

router.post('/login', postLogin);

router.get('/login', getLogin);

router.post('/signup', postSignup);

router.get('/signup', getSignup);

module.exports = router;