process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const Tag = require('../models/tag');

chai.use(chaiHttp);

describe('Tags', function () {

    beforeEach(function (done) {
        Tag.remove({}, function (err) {
            done();
        });
    });

    const apiUrl = '/api/v1/tag';
    const testTag = {
        title: 'Tag 1'
    };

    it('it should receive empty tags list', function (done) {

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

    it('it should fail to create tag without required fields', function (done) {

        const requiredFields = ['title'];
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

    it('it should create a tag and receive it using GET', function (done) {

        chai.request(server)
            .post(apiUrl)
            .send(testTag)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(testTag.title);
                done();
            });
    });

    it('it should update tag', function (done) {

        const patchData = {
            title: 'patched tag',
        };

        chai.request(server)
            .post(apiUrl)
            .send(testTag)
            .end((err, res) => {
                chai.request(server)
                    .patch(`${apiUrl}/${res.body._id}`)
                    .send(patchData)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title').eql(patchData.title);
                        done();
                    });
            });
    });

    it('it should delete a tag', function (done) {

        chai.request(server)
            .post(apiUrl)
            .send(testTag)
            .end((err, res) => {
                chai.request(server)
                    .delete(`${apiUrl}/${res.body._id}`)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
    });
});
