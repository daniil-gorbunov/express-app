const router = require('express').Router();
const restify = require('express-restify-mongoose');
const ObjectId = require('services/db').Types.ObjectId;

router.get('/', require('./index'));

restify.serve(router, require('models/article'), {
    preCreate: function (req, res, next) {
        const author = req.body.author;
        req.body.author = new ObjectId(author);

        const tags = req.body.tags || [];
        req.body.tags = tags.map(tag => new ObjectId(tag));

        next();
    },

    postCreate: function (req, res, next) {
        //TODO find all tags provided in 'tags' field of new article and add new article's ID to theirs 'articles' fields
    }
});
restify.serve(router, require('models/author'));
restify.serve(router, require('models/tag'));

module.exports = router;
