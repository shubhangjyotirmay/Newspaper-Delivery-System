const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        User.findOne({email: email}).then(user => {
            if (!user) {
                return done(null, false, {message: 'That email is not registered'})
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "password incorrect"});
                }
            })
        })
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
    
    passport.deserializeUser(function(email, done) {
        User.findOne({email: email}, function(err, user) {
          done(err, user);
        });
    }); 
}
