const db = require('services/db');

const Tag = db.model('Tag', {
    title: {type: String, required: true},
    articles: [db.Schema.Types.ObjectId],
});

module.exports = Tag;
