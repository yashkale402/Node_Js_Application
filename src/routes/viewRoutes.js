const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.redirect('/dashboard');
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login - TaskDash' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register - TaskDash' });
});

router.get('/dashboard', (req, res) => {
    // In a real app, you would check the token here via cookie or similar, 
    // but for this demo, we'll let the client-side JS handle the redirect if no token is found.
    res.render('dashboard', { title: 'Dashboard - TaskDash' });
});

module.exports = router;
