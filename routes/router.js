const db = require('services/db');
const router = require('express').Router();
const restify = require('express-restify-mongoose');
const ObjectId = require('services/db').Types.ObjectId;
const Tag = require('models/tag');

router.get('/', require('./index'));

const hydrateAuthor = function (article) {
    const author = article.author;
    if (author) {
        article.author = new ObjectId(author);
    }
};

const hydrateTags = function (article) {
    const tags = article.tags || [];
    article.tags = tags.map(tag => new ObjectId(tag));
};

restify.serve(router, require('models/article'), {
    preCreate: function (req, res, next) {
        hydrateAuthor(req.body);
        hydrateTags(req.body);
        next();
    },
    preUpdate: function (req, res, next) {
        hydrateAuthor(req.body);
        hydrateTags(req.body);
        next();
    }
});
restify.serve(router, require('models/author'));
restify.serve(router, require('models/tag'));

module.exports = router;
