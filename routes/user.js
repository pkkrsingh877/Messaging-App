const express = require('express');
const router = express.Router();
const { getLogin, postLogin, getSignup, postSignup } = require('../controllers/authController');
const { getSearch, postSearch, getUser } = require('../controllers/homeController');
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest } = require('../controllers/friendSystemController');

router.get('/sendFriendRequest', sendFriendRequest);

router.get('/acceptFriendRequest', acceptFriendRequest);

router.get('/rejectFriendRequest', rejectFriendRequest);

router.post('/search', postSearch);

router.get('/search', getSearch);

router.post('/login', postLogin);

router.get('/login', getLogin);

router.post('/signup', postSignup);

router.get('/signup', getSignup);

router.get('/:id', getUser);

module.exports = router;