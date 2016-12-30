const db = require('services/db');

module.exports = db.model('Article', {
    header: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: db.Schema.Types.ObjectId, required: true},
    pub_date: {type: Date, default: Date.now},
    views: {type: Number, default: 0},
    comments: [{
        author: {type: String, default: 'anonymous'},
        comment: {type: String, required: true},
        pub_date: {type: Date, default: Date.now}
    }],
    tags: [db.Schema.Types.ObjectId],
});
