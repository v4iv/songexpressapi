var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
require('../bin/config/passport')(passport);

var router = express.Router();
var Song = require('../models/song');


// Extract Token from Header
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


// List
router.get('/', function (req, res, next) {
    Song.find(function (err, items) {
        if (err) return next(err);
        res.json(items);
    })
});

// Create
router.post('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Song.create(req.body, function (err, item) {
            if (err) return next(err);
            res.json(item);
        });
    } else {
        return res.status(403).send({success: false, message: 'Unauthorized.'});
    }
});

// Retrieve
router.get('/:id', function (req, res, next) {
    Song.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

// Update
router.put('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Song.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, item) {
            if (err) return next(err);
            res.json(item);
        });
    } else {
        return res.status(403).send({success: false, message: 'Unauthorized.'});
    }
});

// Delete
router.delete('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Song.findByIdAndRemove(req.params.id, function (err, item) {
            if (err) return next(err);
            res.json(item);
        });
    } else {
        return res.status(403).send({success: false, message: 'Unauthorized.'});
    }
});


module.exports = router;


