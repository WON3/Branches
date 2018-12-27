module.exports = {
    getProfile: (req,res) =>{
        const db = req.app.get('db');
        const {userId} = req.params;
        let profile ={stories:[]};
        db.getProfile(userId)
            .then(response=>{
                if(Object.keys(response[0]).length>0){
                    let r =response[0];
                    profile.username=r.username;
                    profile.bio=r.bio;
                    db.getProfilePicStory(userId).then(response=>{
                        if(response.length>0){
                            profile.url = r.url;
                            for(let story of response){
                                let {story_id,title,is_complete,description} = story;
                                profile.stories.push({story_id,title,is_complete,description});
                            }
                        } else { profile.url = null}
                        res.status(200).send(profile);
                })
            };
            })
    },

}
