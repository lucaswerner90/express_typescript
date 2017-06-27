// Modules imported

import * as assert from 'assert';
import * as supertest from 'supertest';

// My test variables
const serverFile: string = '../server';
let server: any = {};





describe('[*****] Basic server test [*****]', () => {

  before(() => server = supertest(require(serverFile).running_server));

  it('[1] Home route works', (done) => {
    server
      .get('/')
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.message);
        done();
      });
  });
  it('[2] Test route works', (done) => {
    server
      .get('/test')
      .end((err, res) => {
        assert(res.status === 200);
        assert(res.body.message);
        done();
      });
  });
  it('[3] 404 route returns 404 code as a response', (done) => {
    server
      .get('/testsssssssssss')
      .end((err, res) => {
        assert(res.status === 404);
        done();
      });
  });

  after(() => server = {});


});



