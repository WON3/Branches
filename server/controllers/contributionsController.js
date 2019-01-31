const express = require('express');
const contributionsRouter = express.Router();

module.exports = contributionsRouter;


contributionsRouter.get('/:story_id', (req, res) => {
    const db = req.app.get('db');
    const { story_id } = req.params
    const handleError = req.app.get('handleError');
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
        }).catch(err=>{
            handleError(err);
        })
    });

contributionsRouter.post('/', (req, res, next) => {
    const dbInstance = req.app.get('db')
    const handleError = req.app.get('handleError');
    const { 
        story_id,
        contribution,
        prior_contribution_id } = req.body;
    dbInstance.addContribution({
        user_id: req.user.id,
        story_id,
        contribution,
        is_accepted: false,
        prior_contribution_id
    })
        .then(response => {
            console.log(res)
            res.status(200).send(response.data)
        }).catch(err=>{
            handleError(err);
        })
});
contributionsRouter.get(`/last_contribution/:id`, (req,res,next)=>{
    const db = req.app.get('db');
    const handleError = req.app.get('handleError');
    db.contributions.findOne({
        id: req.params.id
    })
    .then(contribution => {
        console.log(res)
        res.status(200).send(contribution)
    }).catch(err=>{
        handleError(err);
    })
})