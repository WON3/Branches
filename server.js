/// Serving static files.
const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  massive = require("massive"),
  path = require("path"),
  app = express(),
  session = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  bcrypt = require("bcrypt"),
  admin = require('./server/controllers/adminController'),
  userRouter = require('./server/controllers/userController'),
  contributionsRouter =  require('./server/controllers/contributionsController'),
  storyRouter = reqire('./server/controllers.storyController');

require("dotenv").config();

/// Serving static files.
massive(process.env.DATABASE_URL)
    .then(db => {
        app.set('db', db);
        console.log('DB is feelin the love')
    }).catch(err => {
        console.log('Oh snap, things did not go as planned.', err.message)
    })
////////////////////Passport authenticate///////////////////////////
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
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

//////////////////// MIDDLEWARE ///////////////////////
app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new LocalStrategy({
    usernameField:'username',
    passReqToCallback:true,
}, (req, username, password, done) => {
        const db =req.app.get('db')
        let locUser = null
        db.users.findOne({username:username})
        .then(user => {
            if(!user) {
                done("User does not exist.")
            }else {
                locUser = user
                return db.user_login.find({user_id:user.id})
            }
        })
        .then((passwords)=>{
            const isCorrectPassword = passwords.reduce((bool, pass) => {
                if(bcrypt.compareSync(password, pass.login_token)){
                    bool = true;
                }
                return bool
            }, false)
            if(isCorrectPassword){
                done(null, locUser)
            }else{
                done("Incorrect password")
            }
        })
        .catch(err => {
            done(err);
        });
}));

passport.serializeUser((user, done) => {
if (!user) {
    done('No user');
    }
done(null, user);
},);

passport.deserializeUser((user, done) => {
    done(null, user);
});

////////////////////Router///////////////////////////////
    
    //User
    app.use('/user', userRouter);

    //Contributions
    app.use('/contributions', contributionsRouter);

    //Stories
    app.use('/newStory', storyRouter);

/////////////////// API ROUTES ///////////////////////////
app.post('/api/login', passport.authenticate(['login']), (req, res, next)=>{
    const db = req.app.get('db');
    const {username} = req.body;
    db.users.findOne({username:username}).then(user=>res.send(user));
})
app.post('/api/register', passport.authenticate(['register']), (req, res, next)=>{
    res.send('Successful registration')
});

/////////////////////////Persist Redux///////////////////////////////////////
app.get('/api/isLoggedIn', (req, res, next)=>{
    res.send(req.user)
})
///////////////// ADMIN ROUTES ///////////////////////////
app.get('/*', admin.publicRouteCatchAll);

const port = process.env.SERVER_PORT || 8070;
app.listen(port, () => {
    console.log(`branchin' on port ${port}`)
})