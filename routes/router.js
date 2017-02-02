const router = require('express').Router();
const restify = require('express-restify-mongoose');
const ObjectId = require('services/db').Types.ObjectId;

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.sendStatus(401);
};

const isNotAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/home');
};

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

module.exports = function (passport) {

    router.get('/', isNotAuthenticated, require('./index'));

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    router.get('/signup', isNotAuthenticated, require('./register'));

    router.post('/signup', isNotAuthenticated, passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.get('/home', isAuthenticated, require('./home'));

    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

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

    return router;
};
