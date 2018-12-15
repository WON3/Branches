const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    path = require('path'),
    app = express()

require('dotenv').config();


/// Serving static files. 
app.use(express.static(path.join(__dirname, '/build')));

massive(process.env.DATABASE_URL)
    .then(db => {
        app.set('db', db);
        console.log('DB is feelin the love')
    }).catch(err => {
        console.log('Oh snap, things did not go as planned.', err.message)
    })

app.use(cors());
app.use(bodyParser.json());

app.get('/api/contributions/:story_id', (req, res) => {
    const db = req.app.get('db');
    const { story_id } = req.params
    const data = {}
    db.get_contributions({
        story_id
    })
    .then(result => {
        data.contributions = result
            // Using findOne() get story title and description
            return db.stories.findOne({
                story_id
            })   // return promise

        })
        .then(result => {
            data.story = {
                title: result.title,
                description: result.description
            }
            res.send(data)
        })
    // .then() will contain story title and description
    // assign data.storyDetails = result from .then() 
    // send data back. res.send
    .catch(error=>{
        console.error("error getting story.")
        res.status(500)
    })
})


/// Catch all for routing
app.get('/*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, "build")
    })
});

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log(`branchin' on port ${port}`)
})