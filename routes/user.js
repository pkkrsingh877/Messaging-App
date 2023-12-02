const express = require('express');
const router = express.Router();

const { getSearch, postSearch, getUser } = require('../controllers/homeController');
const { getFriendRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } = require('../controllers/friendSystemController');

router.get('/sendFriendRequest', sendFriendRequest);

router.get('/acceptFriendRequest', acceptFriendRequest);

router.get('/rejectFriendRequest', rejectFriendRequest);

router.get('/getFriendRequests', getFriendRequests);

router.post('/search', postSearch);

router.get('/search', getSearch);

router.get('/:id', getUser);

module.exports = router;