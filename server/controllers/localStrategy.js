const express = require('express'),
    // passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy,
    bcrypt = require("bcrypt"),
    app = express();
    // app.use(passport.initialize());
    // app.use(passport.session());

module.exports = {

 registerLocalStrategy: new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
    },
    (req, email, password, done) => {
        const db = req.app.get('db');
        const handleError = req.app.get('handleError');
        let locUser =null;
        db.users.findOne({email:email})
        .then(user => {
            if(!user){
                db.users.insert({username: req.body.username,email:req.body.email})
                .then(userid => {
                    locUser = userid;
                    return bcrypt.hash(req.body.password,10)
                })
                .then(pass => {
                    return db.user_login.insert({user_id:locUser.id, login_token:pass})
                })
                .then(user => {
                    done(null, locUser);
                })
            } else {
                done('User with this email already exists');
            } 
        }).catch(err=>{
            handleError(err);
        })                  
    }
),

loginLocalStrategy: new LocalStrategy({
    usernameField:'username',
    passReqToCallback:true,
    }, 
    (req, username, password, done) => {
        const db =req.app.get('db');
        const handleError = req.app.get('handleError');
        let locUser = null;
        db.users.findOne({username:username})
        .then(user => {
            if(!user) {
                done("User does not exist.");
            } else {
                locUser = user;
                return db.user_login.find({user_id:user.id});
            }
        })
        .then((passwords)=>{
            const isCorrectPassword = passwords.reduce((bool, pass) => {
                if(bcrypt.compareSync(password, pass.login_token)){
                    bool = true;
                }
                return bool;
            }, false)
            if(isCorrectPassword){
                done(null, locUser);
            } else{
                done("Incorrect password");
            }
        })
        .catch(err => {
            done(err);
        });
    }
)
}
