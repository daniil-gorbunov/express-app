process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const Author = require('../models/author');

chai.use(chaiHttp);

describe('Authors', function () {

    beforeEach(function (done) {
        Author.remove({}, function (err) {
            done();
        });
    });

    const apiUrl = '/api/v1/author';
    const testAuthor = {
        first_name: 'John',
        last_name: 'Doe',
        birth_date: new Date()
    };

    it('it should receive empty authors list', function (done) {

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

    it('it should fail to create author without required fields', function (done) {

        const requiredFields = ['first_name', 'last_name'];
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

    it('it should create an author and receive it using GET', function (done) {

        chai.request(server)
            .post(apiUrl)
            .send(testAuthor)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('first_name').eql(testAuthor.first_name);
                res.body.should.have.property('last_name').eql(testAuthor.last_name);
                done();
            });
    });

    it('it should update authors\'s content', function (done) {

        const patchData = {
            first_name: 'Albert',
            last_name: 'Einstein'
        };

        chai.request(server)
            .post(apiUrl)
            .send(testAuthor)
            .end((err, res) => {
                chai.request(server)
                    .patch(`${apiUrl}/${res.body._id}`)
                    .send(patchData)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('first_name').eql(patchData.first_name);
                        res.body.should.have.property('last_name').eql(patchData.last_name);
                        done();
                    });
            });
    });

    it('it should delete an author', function (done) {

        chai.request(server)
            .post(apiUrl)
            .send(testAuthor)
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
