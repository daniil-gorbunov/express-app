require('app-module-path').addPath(__dirname + '/');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();


app
// view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')

    .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(require('stylus').middleware(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'public')))

    .use('/', index)
    .use('/users', users)

    // catch 404 and forward to error handler
    .use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    })

    // error handler
    .use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

module.exports = app;
