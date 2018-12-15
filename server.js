/// Serving static files.
const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  massive = require("massive"),
  path = require("path"),
  app = express();
  session = require("express-session");
  passport = require("passport");
  LocalStrategy = require("passport-local").Strategy;
  bcrypt = require("bcrypt");
  contribution = require('./server/controllers/contributionController'),
    story = require('./server/controllers/storyController'),
    user = require('./server/controllers/userController'),
    admin = require('./server/controllers/adminController')

require("dotenv").config();

/// Serving static files.
massive(process.env.DATABASE_URL)
  .then(db => {
    app.set("db", db);
    console.log("DB is feelin the love");
  })
  .catch(err => {
    console.log("Oh snap, things did not go as planned.", err.message);
  });

//////////////////// MIDDLEWARE ///////////////////////
app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

let attempts=0;

passport.use('login', new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,
}, (req, email, password, done) => {
    if(attempt >= 3){
        done('Sorry this account is locked. Please update password to unlock')
    }else{
        const db =req.app.get('db')
        db.user_usertable.findOne({email:email})
        .then(user => {
            if(!user) {
                bcrypt.hash(password, 10)
                .then((password)=>{
                    return db.user_table.insert({email, password})
                })
                .then((user)=>{
                    delete user.password;
                    done(null, user);
                })
            }else if(!bcrypt.compareSync(password, user.password)){
                attempts++

                return done('Invalid email or password');
            }else{
                delete user.password;
                done(null, user);
            }
        })
        .catch(err => {
            done(err);
        });
}

}));

passport.serializeUser((user, done) => {
if (!user) {
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

/// Catch all for routing
app.get("/*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "build")
  });
});

/////////////////// API ROUTES ///////////////////////////

app.get('/api/contributions/:story_id', contribution.get_contribution)
app.post('/api/register', user.register);

///////////////// ADMIN ROUTES ///////////////////////////
app.get('/*', admin.publicRouteCatchAll);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log(`branchin' on port ${port}`)
})
