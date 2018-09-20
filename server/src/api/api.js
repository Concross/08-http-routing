'use strict';

const Notes = require('../models/notes');
const router = require('../lib/router.js');

let basePath = '/api/v1/notes';

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

let sendError = (res, code, msg) => {
  res.statusCode = code;
  res.statusMessage = msg;
  res.setHeader('Content-Type', 'application/json');
  res.write(msg);
  res.end();
};

let serverError = (res, err) => {
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();

};

router.post(`${basePath}`, (req, res) => {
  // do stuff

  if (typeof req.body !== 'object') {
    console.log('bad request in post');
    sendError(res, 400, 'Bad Request');

  } else {
    let record = new Notes(req.body.title, req.body.content);
    record.save()
      .then(data => {
        sendJSON(res, data);
      })
      .catch(err => { serverError(res, err); });
  }

  console.log('no response');

});

router.get(`${basePath}/:id`, (req, res) => {
  // do stuff
  if (!req.query.id) {
    sendError(res, 400, 'Bad Request');

  } else {
    Notes.get(req.query.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  }
});

router.put(`${basePath}`, (req, res) => {
  // do stuff
  if (!req.query.id) {
    sendError(res, 400, 'Bad Request');

  } else {
    let data = { id: req.query.id };
    router.post(`${basePath}`, (req, res) => {
      sendJSON(res, data);
    });
  }
});


router.delete(`${basePath}/:id`, (req, res) => {
  // do stuff
  if (!req.query.id) {
    sendError(res, 404, 'Bad Request');

  } else if (!req.query.id) {
    sendError(res, 400, 'Bad Request, unable to delete resource of undefinied ID');

  } else {
    Notes.delete(res, req.query.id)
      .then(res => {
        res.statusCode = 204;
        res.statusMessage = 'DELETE SUCCESSFUL';
        res.write('');
        res.end();

      })
      .catch(err => serverError(res, err));
  }
});