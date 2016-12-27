process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const Article = require('../models/article');

chai.use(chaiHttp);

describe('Articles', function () {
    beforeEach(function (done) {
        Article.remove({}, function (err) {
            done();
        });
    });

    it('it should GET all the articles', function (done) {
        chai.request(server)
            .get('/api/v1/article')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('it should fail to create article without header', function (done) {
        const newArticle = {
            author: "585e452fe57cdba5f1a57749",
            content: "test content",
            description: "test description",
        };
        chai.request(server)
            .post('/api/v1/article')
            .send(newArticle)
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('header');
                res.body.errors.header.should.have.property('kind').eql('required');
                done();
            });
    });

    it('it should create one article', function (done) {
        const newArticle = {
            header:"test article",
            author: "585e452fe57cdba5f1a57749",
            content: "test content",
            description: "test description",
            comments: [{
                comment: "anonymous comment"
            }, {
                author: "John Doe",
                comment: "comment with author"
            }],
            views: 1337
        };
        chai.request(server)
            .post('/api/v1/article')
            .send(newArticle)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Article successfully added!');
                res.body.should.have.property('content').eql(newArticle.content);
                done();
            });
    });

});
