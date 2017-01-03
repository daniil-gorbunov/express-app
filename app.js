require('app-module-path').addPath(__dirname + '/');

const
    bodyParser = require('body-parser'),
    config = require('./config'),
    express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    expressSession = require('express-session'),
    passport = require('passport'),
    path = require('path'),
    router = require('routes/router')(passport),
    app = express(),
    flash = require('connect-flash');

require('services/passport/init')(passport);

app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')

    .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(require('stylus').middleware(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'public')))
    .use(flash())

    .use(expressSession({
        secret: config.auth.secretKey,
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())

    .use('/', router)

    .use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    })

    .use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.render('error');
    });

module.exports = app;
