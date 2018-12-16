module.exports = {
    get_contribution: (req, res) => {
        const db = req.app.get('db');
        const { story_id } = req.params
        const data = {}
        db.get_contributions({
            story_id
        })
        .then(result => {
            data.contributions = result
                // Using findOne() get story title and description
                return db.stories.findOne({
                    story_id
                })   // return promise
    
            })
            .then(result => {
                data.story = {
                    title: result.title,
                    description: result.description
                }
                res.send(data)
            })
        // .then() will contain story title and description
        // assign data.storyDetails = result from .then() 
        // send data back. res.send
        .catch(error=>{
            console.error("error getting story.")
            res.status(500)
        })
    }
}