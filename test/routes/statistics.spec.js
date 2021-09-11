process.env.NODE_ENV = 'test';
require("dotenv").config();
const { TEST_TOKEN } = process.env;
const expect = require('chai').expect;
const request = require('supertest');

const falseToken = {'Authorization': 'Token 1234567890'}
const hardCodeTkn = {'authorization' : TEST_TOKEN }
const app = require('../../index');
const conn = require("../../src/database");

describe('statistics AND sync testing', function(){
  before(function (done){
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('GET STATISTICS without an authorization', function (done) {
    request(app).get('/api/statistics')
      .then((res) => {
        expect(res.status).to.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('GET SYNC without anauthorization', function (done) {
    request(app).get('/api/sync')
      .then((res) => {
        expect(res.status).to.equal(403)
        done();
      })
      .catch((err) => done(err));
  });

  it('GET SYNC with an invalid authorization', function (done) {
    request(app).get('/api/sync')
    .set(falseToken)
      .then((res) => {
        expect(res.status).to.equal(403)
        done();
      })
      .catch((err) => done(err));
  });

  it('GET SYNC with a valid authorization', function (done) {
    request(app).get('/api/sync')
    .set(hardCodeTkn)
      .then((res) => {
        const body = res.body
        expect(res.status).to.equal(200)
        expect(body).to.deep.equal({ api: 'data has been overwritten' })
        done();
      })
      .catch((err) => done(err));
  });

  it('GET STATISTICS  with an invalid authorazation', function (done) {
    request(app).get('/api/statistics')
    .set(falseToken)
      .then((res) => {
        expect(res.status).to.equal(403)
        done();
      })
      .catch((err) => done(err));
  });

  it('GET STATISTICS  with a valid authorazation', function (done) {
    request(app).get('/api/statistics')
    .set(hardCodeTkn)
      .then((res) => {
        const body = res.body
        expect(res.status).to.equal(200)
        expect('Content-Type', /json/) 
        expect(body.length).to.equal(235)
        expect(body[0]).to.contain.property('cases')
        expect(body[0]).to.contain.property('deaths')
        expect(body[0]).to.contain.property('tests')
        done();
      })
      .catch((err) => done(err));
  });

  it('GET STATISTICS  without an authorazation', function (done) {
    request(app).get('/api/statistics')
      .then((res) => {
        expect(res.status).to.equal(403)
        done();
      })
      .catch((err) => done(err));
  });

})

