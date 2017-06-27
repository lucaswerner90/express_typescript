<<<<<<< HEAD
// Modules imported
"use strict";
const assert = require('assert');
const supertest = require('supertest');
// My test variables
const serverFile = '../server';
let server = {};
describe('[*****] Basic server test [*****]', () => {
    before(() => server = supertest(require(serverFile).running_server));
    it('[1] Home route works', (done) => {
        server
            .get('/')
            .end((err, res) => {
            assert(res.status === 200);
=======
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
>>>>>>> 39ab4e82f09ef5403b2e2cbcb5e97bda15c4e40f
            assert(res.body.message);
            done();
        });
    });
<<<<<<< HEAD
    it('[2] Test route works', (done) => {
        server
            .get('/test')
            .end((err, res) => {
            assert(res.status === 200);
=======
    it('Test route works', (done) => {
        server
            .get('/test')
            .end((err, res) => {
            assert(res.status === constants_1.SERVER_RESPONSE_CODES.OK);
>>>>>>> 39ab4e82f09ef5403b2e2cbcb5e97bda15c4e40f
            assert(res.body.message);
            done();
        });
    });
<<<<<<< HEAD
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
=======
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
>>>>>>> 39ab4e82f09ef5403b2e2cbcb5e97bda15c4e40f
