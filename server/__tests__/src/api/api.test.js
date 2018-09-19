'use strict';

let router = require('../../../src/lib/router');
let app = require('../../../src/app');
let request = require('supertest');

let apiRequest = request('localhost:3000');
let basePath = '/api/v1/notes';

/***********************************
*     POST request tests           *
************************************/
describe('POST /api/v1/notes', () => {
  let localRequest = request('http://localhost:3000');
  let path = '/api/v1/notes';
  it('should return a 200 response', (done) => {
    let content = JSON.stringify({ id: 'f78bdee0-bb8a-11e8-ab67-2d7d3a33b11b', createdOn: '2018-09-18T21:36:56.783Z' });
    console.log(content);
    localRequest
      .post(path)
      .set('Content-Type', 'application/json')
      .send(content)
      .expect(200, JSON.parse(content), done);
  });

  it('should return a 400 response and Bad Request if req.body is invalid or absent', (done) => {
    apiRequest
      .post(basePath)
      .expect(400, 'Bad Request', done);
  });
});

/***********************************
*     GET request tests            *
************************************/
describe('GET /api/v1/notes/:id', () => {

  it('should respond with json for the corresponding id', () => {
    let path = `${basePath}?id=1`;
    return apiRequest
      .get(path)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        console.log(response.text);
        console.log(response.body);
        expect(response.body.id).toBe('1');
      });
  });

  it('should return a 400 response with bad request if no id was provided', () => {
    return apiRequest
      .get(basePath)
      .set('Accept', 'application/json')
      .expect(400);
  });
});