const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    path = require('path'),
    app = express(),
    contribution = require('./server/controllers/contributionController'),
    story = require('./server/controllers/storyController'),
    user = require('./server/controllers/userController'),
    admin = require('./server/controllers/adminController'),
    passport = require('passport');
    LocalStrategy = require('passport-local').Strategy;
    bcrypt = require('bcrypt'),
    session = require('express-session');

require('dotenv').config();

massive(process.env.DATABASE_URL)
    .then(db => {
        app.set('db', db);
        console.log('DB is feelin the love')
    }).catch(err => {
        console.log('Oh snap, things did not go as planned.', err.message)
    })
////////////////////Passport authenticate///////////////////////////
app.use(session({
    secret:process.env.SESSION_SECRET
}))

app.use( passport.initialize() );
app.use( passport.session() );



passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, (req,email, username, done) => {
        const db = req.app.get('db');
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
        })
        .catch(err => {
            done(err);
        });
                        
    }
));

passport.serializeUser((user,done)=> {
    if(!user){
        done('No user');
    }

    done(null, user);
    },
);

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.post('/login', passport.authenticate(['login']), (req, res, next)=>{
    res.send('Successful Login!')
})

//////////////////// MIDDLEWARE ///////////////////////
app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());
app.use(bodyParser.json());

/////////////////// API ROUTES ///////////////////////////

app.get('/api/contributions/:story_id', contribution.get_contribution)
app.post('/api/register', passport.authenticate(['register']), (req, res, next)=>{
    res.send('Successful Login!')
})

///////////////// ADMIN ROUTES ///////////////////////////
app.get('/*', admin.publicRouteCatchAll);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log(`branchin' on port ${port}`)
})
