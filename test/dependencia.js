const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const sinon = require('sinon');

const server = require('../app');
const { Dependencia, Representante } = require('../models');
chai.use(chaiHttp);

const aDependencia = (id) => ({
  id,
  name: faker.company.companyName()
});

const aRepresentante = (id) => ({
  id,
  name: faker.name.firstName()
})

describe('/dependencias', function () {

  this.afterEach(function () {
    sinon.restore();
  });

  this.afterAll(function () {
    server.close();
  });

  describe('GET /', function () {

    it('Should return a list of dependencias with a list of representantes in the meeting', function (done) {
      const dependenciasDummy = [aDependencia(1), aDependencia(2)];
      const findAndCountAllFake = sinon.fake.resolves({ count: dependenciasDummy.length, rows: dependenciasDummy });
      // sinon.replace(Dependencia, 'findAndCountAll', findAndCountAllFake);

      chai.request(server)
        .get('/api/dependencias')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.not.be.undefined;
          expect(res).to.have.status(200);
          expect(res.body.total).to.be.a('number');
          expect(res.body.data).to.be.an('array').that.is.not.empty;
          expect(res.body.data[0].representantes).to.be.an('array')
          // expect(findAndCountAllFake.calledOnce).to.be.true;
          done();
        });
    });


    it('Should return a list of 5 dependencias', function (done) {
      const dependenciasDummy = [
        aDependencia(1), aDependencia(2), aDependencia(3),
        aDependencia(4), aDependencia(5)
      ];

      const findAndCountAllFake = sinon.fake.resolves({ count: dependenciasDummy.length, rows: dependenciasDummy })
      sinon.replace(Dependencia, 'findAndCountAll', findAndCountAllFake);

      chai.request(server)
        .get('/api/dependencias?page=1&perPage=5')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).to.have.lengthOf(5);
          expect(findAndCountAllFake.calledOnce).to.be.true;
          done();
        })
    });


    it('Should fail to return a list of dependencias due to semantic errors', function (done) {
      chai.request(server)
        .get('/api/dependencias?page=a&perPage=notanumber')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          expect(res.body.errors).to.be.an('array').that.is.not.empty;
          done();
        });
    });

    it('Should fail because of a connection to DB', function (done) {
      const fakeError = sinon.fake.rejects(new Error('Connection to DB failed'));
      sinon.replace(Dependencia, 'findAndCountAll', fakeError);

      chai.request(server)
        .get('/api/dependencias')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.error.text).to.be.eq('Connection to DB failed');
          done();
        });
    });

  });

  
  describe('GET /:id/representantes', function () {

    it('Should return the representantes of a dependencia', function (done) {
      const representantes = [aRepresentante(1), aRepresentante(2)];
      const findAndCountAllFake = sinon.fake.resolves({ count: 2, rows: representantes });
      sinon.replace(Representante, 'findAndCountAll', findAndCountAllFake);
      chai.request(server)
        .get('/api/dependencias/1/representantes')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array').that.is.not.empty;
          expect(findAndCountAllFake.calledOnce).to.be.true;
          done();
        })
    });

    it('Should fail due to invalid dependencia', function (done) {
      chai.request(server)
        .get('/api/dependencias/notvalid/representantes')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          done();
        })
    })

  });
});