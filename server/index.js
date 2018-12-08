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

app.listen(port,() => {
    console.log(`Listening on port ${port}`)
});