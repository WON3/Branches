module.exports = {
    getProfile: (req,res) =>{
        const db = req.app.get('db');
        const {userId} = req.params;
        db.getProfile(userId)
            .then(response=>{
                console.log(response)
                res.status(200)
                    .send(response.data);
            }).catch(err=>{
                res.status(500).send({errorMessage:'could not retrieve profile.'})
                console.log(err);
            })

    }
}