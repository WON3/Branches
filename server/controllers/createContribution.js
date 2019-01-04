module.exports = {

    create_contribution: (req, res, next) => {
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
    }
}