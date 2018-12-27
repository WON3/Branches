module.exports = {
    getProfile: (req,res) =>{
        const db = req.app.get('db');
        const {userId} = req.params;
        let profile ={};
        db.getProfile(userId)
            .then(response=>{
                if(Object.keys(response[0]).length>0){
                    let r =response[0];
                    profile.username=r.username;
                    profile.bio=r.bio;
                    db.getProfilePicture(userId).then(response=>{
                        if(response.length>0){
                            profile.url = r.url;
                        } else { profile.url = null}
                        res.status(200).send(profile);
                })
            };
            })
    },

}

// .catch(err=>{
//     res.status(500).send({errorMessage:'could not retrieve profile.'})
//     console.log(err);
// })