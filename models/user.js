const db = require('services/db');

module.exports = db.model('User', {
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});
