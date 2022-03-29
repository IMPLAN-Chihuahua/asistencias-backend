const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../app');
chai.use(chaiHttp);

describe('/representantes', function () {

  this.afterEach(function () {
    sinon.restore();
  });

  this.afterAll(function () {
    server.close();
  });

  describe('GET /', function () {

    it('Should return a list of reprensentantes', function (done) {
      chai.request(server)
        .get('/api/representantes')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array').that.is.not.empty;
          expect(res.body.data[0].dependenciaName).to.be.an('string');
          expect(res.body.total).to.be.an('number');
          done();
        })
    });

    it('Should filter representantes by checked in', function (done) {
      chai.request(server)
        .get('/api/representantes?checkedIn&perPage=3')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res.body.data).to.satisfy((representantes) => {
            return representantes.every(r => r.checkedIn === true)
          });
          done();
        })
    })

  });

  describe('PATCH /representantes/:id', function () {

    it('Should check-in a representante', function (done) {
      chai.request(server)
        .patch('/api/representantes/76/join')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Should kick a representante out of the reunion', function (done) {
      chai.request(server)
        .patch('/api/representantes/4/kickOut')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Should fail to process request due to semantic errors (invalid fields)', function (done) {
      chai.request(server)
        .patch('/api/representantes/1/invalidaction')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          done();
        });
    });

  });

});