const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');
const { search } = require('../controllers/homeController');

router.post('/search', search);

router.get('/search', (req, res) => {
    res.render('home/search');
});

router.post('/login', login);

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/signup', signup);

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

module.exports = router;