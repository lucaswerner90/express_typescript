const serverFile = '../bin/server';
let server = {};
const assert = require('assert');
const supertest = require('supertest');

beforeEach(() => server = supertest(require(serverFile)));


describe('Main test --> ', () => {
  it('Home route works', (done) => {
    server
      .get('/')
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.message);
        done();
      });
  });
  it('Test route works', (done) => {
    server
      .get('/test')
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.message);
        done();
      });
  });
  it('404 route returns 404 code as a response', (done) => {
    server
      .get('/testsssssssssss')
      .end((err, res) => {
        assert(res.status === 404);
        done();
      });
  });
});


afterEach(() => server = {});
