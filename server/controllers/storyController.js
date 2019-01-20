const express = require('express');
const storyRouter = express.Router();

module.exports = storyRouter;

    storyRouter.post('/', (req, res, next) =>{
        const dbInstance = req.app.get('db');
        const handleError = req.app.get('handleError');
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
        }).catch(err=>{
            handleError(err);
        })
    });   
