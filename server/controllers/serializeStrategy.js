// const express = require('express'),
//     passport = require('passport'),
//     app = express();
//     // app.use(passport.initialize());
//     // app.use(passport.session());

module.exports = {
    serialize: (user, done) => {
        if(!user){
            done('No user');
        }
        done(null, user);
    },
    deserialize: (username, done) => {
        done(null, username);
    },
}