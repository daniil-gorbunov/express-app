const express = require('express');
const router = express.Router();

const db = require('services/db');
const Article = require('models/article');

router.get('/', function (req, res, next) {

    let myPost = new Article({
        header: 'my test article',
        description: 'article description',
        content: 'article content. lots of text here',
        author: db.Types.ObjectId("585e452fe57cdba5f1a57749"),
        pub_date: new Date,
        views: 1337,
        comments: [{
            author: 'commenter 1',
            comment: 'comment 1',
            pub_date: new Date
        }],
    });
    myPost.save(err => console.log(err ? err : 'post saved'));

    Article.find({}, function(err, data){
        console.log(err ? err : data)
    });

    res.render('index', {title: 'Express'});
});

module.exports = router;
