var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

var User = require('../../models/user');
var settings = require('./settings');

module.exports = function (passport) {
    var options = {};
    options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    options.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(options, function (token, done) {
        User.findOne({id: token.id}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};