const db = require('services/db');

module.exports = db.model('Author', {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birth_date: Date,
});
