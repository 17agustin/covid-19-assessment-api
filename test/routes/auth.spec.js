process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');


const validUser = {
    "name":"valid",
    "lastname": "user",
    "email": "testingvalid@user.com",
    "password": "IcanSignup7",
    }

const invalidUser = {
    "name":"invalid",
    "lastname": "user",
    "email": "testinginvalid@user.com",
    "password": "none",
}

const loginVuser = {
    "email": "testingvalid@user.com",
    "password": "IcanSignup7",
}

const loginINVuser = {
    "email": "testinginvalid@user.com",
    "password": "none",
}

const app = require('../../index');
const conn = require("../../src/database");

describe('login AND signup', function(){
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

  it('SIGNUP a new user', function (done) {
    request(app).post('/api/auth/signup')
    .send(validUser)
      .then((res) => {
          const body = res.body
        expect(res.status).to.equal(200);
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('lastname');
        expect(body).to.contain.property('email');
        done();
      })
      .catch((err) => done(err));
  });

  it('SIGNUP an invalid user', function (done) {
    request(app).post('/api/auth/signup')
    .send(invalidUser)
      .then((res) => {
          const body = res.body
        expect(res.status).to.equal(200);
        expect(body).to.deep.equal({ msg: "you can't signup" })
        done();
      })
      .catch((err) => done(err));
  });


  it('LOGIN the valid user ', function (done) {
    request(app).post('/api/auth/login')
    .send(loginVuser)
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('LOGIN the invalid user', function (done) {
    request(app).post('/api/auth/login')
    .send(loginINVuser)
      .then((res) => {
        const body = res.body
        expect(res.status).to.equal(200)
        expect(body).to.contain.property('msg')
        expect(body).to.deep.equal({'msg':"Couldn't Login: authentication Error, please check your information"})
        done();
      })
      .catch((err) => done(err));
  });


})

