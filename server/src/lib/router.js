'use strict';

const parser = require('./parser.js');

const router = module.exports = {};

// This object will hold our routing table
router.routes = {};

const methods = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'];

methods.forEach(method => {
  router.routes[method] = {};

  router[method.toLowerCase()] = function (path, cb) {
    router.routes[method][path] = cb;
  };
});

router.route = (req, res) => {
  return parser(req)
    .then(req => {
      let handler = router.routes[req.method][req.parsed.pathname];
      console.log(handler);
      console.log(req.method, req.parsed.pathname);

      if (handler) {
        return handler(req, res);

      } else {

        res.statusCode = 404;
        res.statusMessage = 'resource not found';
        res.write('404: resource not found');
        res.end();
      }
    })
    .catch(err => {
      console.error(err);
      res.statusCode = 500;
      res.statusMessage = 'Error while parsing request';
      res.write('Request failed parsing', req.parsed.pathname);
      res.end();
    });
};