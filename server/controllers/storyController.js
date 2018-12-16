module.exports = {

    addStory: (req, res, next) =>{
        const dbInstance = req.app.get('db');
        

        dbInstance.addNewStory()
        .then( res => {
            res.status(200).send()
        }).catch( err => {
            res.status(500).send( {errorMessage: "Failed to add new story"});
            console.log(err);
        })
    }   
}