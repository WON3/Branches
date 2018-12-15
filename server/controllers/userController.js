module.exports = {
    register:(req,res) => {
        const db = req.app.get('db');
        const {uername,email,password} = req.body;
    }
}