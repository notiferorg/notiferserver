var express = require('express');
var router = express.Router();
var config = require('../config');

var apiVersion = config.apiVersion;
var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'NotiFer API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
    contact: {
      name: "Chathura Wijesinghe",
      url: "http://notifer.org",
      email: "cdanasiri@gmail.com"
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  host: 'dev.notifer.org',
  basePath: '/api/' + apiVersion,
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js', './models/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

/* default router response */
router.all('/' + apiVersion, function (req, res, next) {
  return res.json({ title: 'Welcome to NotiFer' });
});

// serve swagger
router.get('/' + apiVersion + '/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'NotiFer' });
});

router.use('/' + apiVersion + '/device', require('./device'));
router.use('/' + apiVersion + '/merchant', require('./merchant'));
router.use('/' + apiVersion + '/mtype', require('./merchantType'));
router.use('/' + apiVersion + '/zmq', require('./zeromq'));

module.exports = router;
