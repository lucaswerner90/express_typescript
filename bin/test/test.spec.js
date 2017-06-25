Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const supertest = require("supertest");
const constants_1 = require("../constants");
let server;
beforeEach(() => server = supertest(require('../server')));
describe('Main test --> ', () => {
    it('Home route works', (done) => {
        server
            .get('/')
            .end((err, res) => {
            assert(res.status === constants_1.SERVER_RESPONSE_CODES.OK);
            assert(res.body.message);
            done();
        });
    });
    it('Test route works', (done) => {
        server
            .get('/test')
            .end((err, res) => {
            assert(res.status === constants_1.SERVER_RESPONSE_CODES.OK);
            assert(res.body.message);
            done();
        });
    });
    it('404 route returns 404 code as a response', (done) => {
        server
            .get('/testsssssssssss')
            .end((err, res) => {
            assert(res.status === constants_1.SERVER_RESPONSE_CODES.NOT_FOUND);
            done();
        });
    });
});
afterEach(() => server = {});
