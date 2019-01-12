const express = require('express');
const storyRouter = express.Router();

module.exports = storyRouter;

    storyRouter.post('/', (req, res, next) =>{
        const dbInstance = req.app.get('db');
        const {is_complete,
            user_id,
            title,
            description,
            point_of_view,
            is_public,
            allows_fork,
            moderator_accepts} = req.body;

        dbInstance.addNewStory(is_complete,
            user_id,
            title,
            description,
            point_of_view,
            is_public,
            allows_fork,
            moderator_accepts)
        .then( response => {
            res.status(200).send(response.data)
        }).catch( err => {
            res.status(500).send( {errorMessage: "Failed to add new story"});
            console.log(err);
        })
    });   
