var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var connect = require('./bin/config/db');


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var songsRouter = require('./routes/songs');

var app = express();
connect();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Path to Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api/songs', songsRouter);
app.use('/api/auth', authRouter);

// 404 Error handler
app.use(function (req, res, next) {
    var err = new Error('404: Not Found');
    err.status = 404;
    next(err);
});

// API Error Handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({error: err});
});
module.exports = app;
