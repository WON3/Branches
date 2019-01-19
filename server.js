/// Serving static files.
const express =         require("express"),
  cors =                require("cors"),
  bodyParser =          require("body-parser"),
  massive =             require("massive"),
  path =                require("path"),
  app =                 express(),
  session =             require("express-session"),
  passport =            require("passport"),
  admin =               require('./server/controllers/adminController'),
  userRouter =          require('./server/controllers/userController'),
  contributionsRouter = require('./server/controllers/contributionsController'),
  storyRouter =         require('./server/controllers/storyController'),
  localStrategy =       require('./server/controllers/localStrategy'),
  serializeStrategy =   require('./server/controllers/serializeStrategy'),
  morgan =              require('morgan');

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

//////////////////// MIDDLEWARE ///////////////////////
app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
passport.use('register', localStrategy.registerLocalStrategy);
passport.use('login', localStrategy.loginLocalStrategy);

passport.serializeUser(serializeStrategy.serialize);

passport.deserializeUser((username, done) => {
    done(null,username);
});

////////////////////Router///////////////////////////////

//User
app.use('/user', userRouter, morgan);


//Contributions
app.use('/contributions', contributionsRouter);

//Stories
app.use('/newStory', storyRouter);

//
app.get('/api/Dashboard',(req, res, next)=>{
    const db = app.get('db');
    db.stories.find()
    .then((stories)=>{
        res.send(stories)
    })
})


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
app.get('/*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, "build")
    })
});

const handleError = (err, response) => {
    console.log(err)
    response.message(`There was an error with your request. ${err}`)
}

const port = process.env.SERVER_PORT || 8070;
app.listen(port, () => {
    console.log(`branchin' on port ${port}`)
})