const db = require('services/db');

const Tag = db.model('Tag', {
    title: {type: String, required: true}
});

module.exports = Tag;
