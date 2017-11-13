var swaggerJSDoc = require('swagger-jsdoc'),
config = require('config');

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
  basePath: '/api/v1' 
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

module.exports = (router) => {

  /* default router response */
  router.get('/', function(req, res) {
    res.send('Wellcome to '+config.application.APP_NAME+' api!');
  });

  // serve swagger
  router.get('/swagger', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  require('./device')(router);
  require('./merchant')(router);
  require('./merchantType')(router);

}
