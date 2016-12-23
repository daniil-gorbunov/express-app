const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/local');

const Post = mongoose.model('Post', {
    title: String,
    views: Number
});

router.get('/', function (req, res, next) {

    let myPost = new Post({
        title: 'Post Title',
        views: 1337
    });
    myPost.save(err => console.log(err ? err : 'post saved'));

    Post.find({}, function(err, data){
        console.log(err ? err : data)
    });

    res.render('index', {title: 'Express'});
});

module.exports = router;
