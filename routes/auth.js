var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../bin/config/settings');
require('../bin/config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');

// Create
router.post('/register', function (req, res) {
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.username || !req.body.password) {
        res.json({success: false, message: 'All fields are required!'});
    } else {
        var newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        // Create new User.
        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, message: 'Error: Username or Email already exists!'});
            }
            res.json({success: true, message: 'Success: New user created.'})
        });
    }
});

// Authenticate
router.post('/login', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toJSON(), settings.secret);

                    res.json({success: true, token: token})
                } else {
                    res.status(401).send({success: false, message: 'Authentication failed. Wrong Credentials.'});
                }
            });
        }
    });
});

module.exports = router;