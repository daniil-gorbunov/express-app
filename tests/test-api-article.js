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

    const apiUrl = '/api/v1/article';
    const testArticle = {
        header: 'test article',
        author: '585e452fe57cdba5f1a57749',
        content: 'test content',
        description: 'test description',
        comments: [{
            comment: 'anonymous comment'
        }, {
            author: 'John Doe',
            comment: 'comment with author'
        }],
        views: 1337,
        tags: ['585e452fe57cdba5f1a57749', '585e452fe57cdba5f1a57750']
    };

    it('it should receive empty articles list', function (done) {

        chai.request(server)
            .get(apiUrl)
            .then(res => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
            .catch(err => console.log(err));
    });

    it('it should fail to create article without required fields', function (done) {

        const requiredFields = ['header', 'author', 'content', 'description'];
        chai.request(server)
            .post(apiUrl)
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');

                requiredFields.forEach(field => {
                    res.body.errors.should.have.property(field);
                    res.body.errors[field].should.have.property('kind').eql('required');
                });

                done();
            });
    });

    it('it should create an article and receive it using GET', function (done) {

        chai.request(server)
            .post(apiUrl)
            .send(testArticle)
            .end ((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('content').eql(testArticle.content);
                done();
            });
    });

    it('it should update article', function (done) {

        const patchData = {
            content: 'content patched',
        };

        chai.request(server)
            .post(apiUrl)
            .send(testArticle)
            .end((err, res) => {
                chai.request(server)
                    .patch(`${apiUrl}/${res.body._id}`)
                    .send(patchData)
                    .end ((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('content').eql(patchData.content);
                        done();
                    });
            });
    });

    it('it should delete an article', function (done) {

        chai.request(server)
            .post(apiUrl)
            .send(testArticle)
            .end((err, res) => {
                chai.request(server)
                    .delete(`${apiUrl}/${res.body._id}`)
                    .end ((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
    });
});
