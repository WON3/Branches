const express = require('express');
const userRouter = express.Router();

module.exports = userRouter;

    userRouter.get('/profile/:userId' , (req,res) =>{
        const db = req.app.get('db');
        const {userId} = req.params;
        let profile ={stories:[]};
        db.getProfile(userId)
            .then(response=>{
                if(Object.keys(response[0]).length>0){
                    let r =response[0];
                    profile.username=r.username;
                    profile.bio=r.bio;
                    db.getStory(userId).then(response=>{
                        if(response.length>0){
                            for(let story of response){
                                let {story_id,title,is_complete,description} = story;
                                profile.stories.push({story_id,title,is_complete,description});
                            }
                        } 
                    res.send(profile);
                })
            };
        }).catch(err=>{
            handleError(err);
        })
    });
    
    userRouter.put('/bio/:userId' , (req,res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const {bio} = req.query
        db.users.update({id:userId}, {bio:bio}),(err,res) => {
            res.send('Update successful.')
        };
    });

    userRouter.put('/profilePic/:userId' , (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        const {url} = req.body;
        db.profile_pic.update({user_id:userId},{url:url}),(err, res) => {
            res.send('Successful update!')
        };
    });

    userRouter.get('/profilePic/:userId' , (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        db.profile_pic.find({user_id:userId}).then((response)=>{
            res.send(response)    
        }).catch(err=>{
            handleError(err);
        })
    });

