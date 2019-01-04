module.exports = {
    get_contribution: (req, res) => {
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
    }
}