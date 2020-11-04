const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

// Import model
require('../models/User');

// Create link
router.get('/create-link', (req, res) => {
    res.render('message/create-link');
})

// Submit create link
router.post('/create-link', async(req, res) => {
    if (req.body.name.trim() === ''){
        return res.redirect('/message/create-link');
    }
    let user = new User({name: req.body.name});
    user.save()
    .then((user) => {
        res.redirect(`/message/user/${user.id}`);
    });
});

// Get a specific user
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        res.render('message/user', {user});
    }).catch((e) => {
        res.redirect('/');
    })
});

// share message - GET
router.get('/user/:id/share', (req, res) => {
    User.findById(req.params.id)
    .then(user => res.render('message/share', {user}))
    .catch(e => res.redirect('/'));
});

// share message - POST
router.post('/user/:id/share', (req, res) => {
    if(req.body.message.trim() === ''){
        return res.redirect(`/message/user/${req.params.id}/share`);
    }

    User.findById(req.params.id)
    .then((user) => {
        user.messages.push(req.body.message.trim());
        user.save().then(user => res.redirect('/'));
    })
    .catch(e => res.redirect('/'));
});

module.exports = router;