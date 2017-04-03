var router = require('express').Router();
// var uuid = require('uuid4');
// var validator = require('validator');
var config = require('../config');

var apiVersion = config.apiVersion;
var zmq = require('../zeromq/pubber');


router.get('/words', function (req, res, next) {
    zmq.show(req, res);
});

module.exports = router;