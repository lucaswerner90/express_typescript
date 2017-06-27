import * as assert from 'assert';
import * as supertest from 'supertest';
import {SERVER_RESPONSE_CODES} from '../constants';


let server:any;

beforeEach(() => server = supertest(require('../server').running_server));


describe('Main test --> ', () => {
  it('Home route works', (done) => {
    server
      .get('/')
      .end((err, res) => {
        assert(res.status === SERVER_RESPONSE_CODES.OK);
        assert(res.body.message);
        done();
      });
  });


  it('Test route works', (done) => {
    server
      .get('/test')
      .end((err, res) => {
        assert(res.status === SERVER_RESPONSE_CODES.OK);
        assert(res.body.message);
        done();
      });
  });


  it('404 route returns 404 code as a response', (done) => {
    server
      .get('/testsssssssssss')
      .end((err, res) => {
        assert(res.status === SERVER_RESPONSE_CODES.NOT_FOUND);
        done();
      });
  });
});


afterEach(() => server = {});
