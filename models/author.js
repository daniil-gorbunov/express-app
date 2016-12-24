const db = require('services/db');

const Author = db.model('Author', {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birth_date: Date,
});

module.exports = Author;
