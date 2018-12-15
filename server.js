const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    path = require('path'),
    app = express(),
    contribution = require('./server/controllers/contributionController'),
    story = require('./server/controllers/storyController'),
    user = require('./server/controllers/userController'),
    admin = require('./server/controllers/adminController')

require('dotenv').config();

massive(process.env.DATABASE_URL)
    .then(db => {
        app.set('db', db);
        console.log('DB is feelin the love')
    }).catch(err => {
        console.log('Oh snap, things did not go as planned.', err.message)
    })

//////////////////// MIDDLEWARE ///////////////////////
app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());
app.use(bodyParser.json());

/////////////////// API ROUTES ///////////////////////////

app.get('/api/contributions/:story_id', contribution.get_contribution)
app.post('/api/register', user.register);

///////////////// ADMIN ROUTES ///////////////////////////
app.get('/*', admin.publicRouteCatchAll);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log(`branchin' on port ${port}`)
})
