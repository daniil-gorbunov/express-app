const db = require('services/db');

module.exports = db.model('Tag', {
    title: {type: String, required: true}
});
