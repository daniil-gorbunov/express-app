const router = require('express').Router();
const restify = require('express-restify-mongoose');

router.get('/', require('./index'));

restify.serve(router, require('models/article'));
restify.serve(router, require('models/author'));
restify.serve(router, require('models/tag'));

module.exports = router;
