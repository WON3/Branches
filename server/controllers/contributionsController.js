const express = require('express');
const contributionsRouter = express.Router();

module.exports = contributionsRouter;

contributionsRouter.get('/:story_id', (req, res) => {
    const db = req.app.get('db');
    const { story_id } = req.params
    const data = {}
    db.get_contributions({
        story_id,
    })
        .then(result => {
            data.contributions = result
            return db.stories.findOne({
                story_id
            })
        })
        .then(result => {
            data.story = {
                title: result.title,
                description: result.description,
            }
            res.send(data)
        })
        .catch(error => {
            console.error("error getting story.")
            res.status(500)
        })
    });

contributionsRouter.post('/', (req, res, next) => {
    const dbInstance = req.app.get('db')
    const { 
        story_id,
        contribution,
        prior_contribution_id } = req.body;
    dbInstance.addContribution({
        user_id: req.user.user_id,
        story_id,
        contribution,
        is_accepted: false,
        prior_contribution_id
    })
        .then(response => {
            console.log(res)
            res.status(200).send(response.data)
        }).catch(err => {
            res.status(500).send({ errormessage: "Failed to add contribution to story" });
            console.log(err);
        })
});