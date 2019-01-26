module.exports = {
    serialize: (user, done) => {
        if(!user){
            done('No user');
        }
        done(null, user);
    },
    deserialize: (username, done) => {
        done(null, username);
    },
}