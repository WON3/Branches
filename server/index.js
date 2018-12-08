const express = require('express'),
    path  = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    app = express();


require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.SERVER_PORT || 8000;


// massive(process.env.CONNECTION_STRING)
//     .then(db => {
//         app.set('db',db);
        app.listen(port,() => {
            console.log(`Listening on port ${port}`)
        });
    // })
    // .catch(err => {
    //     console.log(`Error connecting to database.`, err.message);
    // })
    