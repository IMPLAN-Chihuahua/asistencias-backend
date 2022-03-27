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
          expect(res.body.total).to.be.an('number');
          done();
        })
    });

  });

  describe('PATCH /representantes/:id', function () {

    it('Should check-in a representante', function (done) {
      chai.request(server)
        .patch('/api/representantes/6')
        .send({ checkedIn: true })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

  });

});