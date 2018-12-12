var mongoose = require('mongoose');
var debug = require('debug')('expressapi:database');
mongoose.Promise = require('bluebird');

var connect = () => mongoose.connect('mongodb://localhost/expressapi', {
    useNewUrlParser: true,
    promiseLibrary: require('bluebird')
}).then(() =>
    debug("Connection to database successful")
).catch((err) =>
    console.log(err)
);

module.exports = connect;