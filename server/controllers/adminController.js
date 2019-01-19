const path = require('path')


module.exports = {
    publicRouteCatchAll:(req, res) => {
        res.sendFile('index.html', {
            root: path.join(__dirname, "../../build")
        })
    }
}