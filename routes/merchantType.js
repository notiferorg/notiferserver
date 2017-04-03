var router = require('express').Router();
var uuid = require('uuid4');
var validator = require('validator');
var config = require('../config');

var apiVersion = config.apiVersion;
var mTypeCtrl = require('../controllers/merchantTypeCtrl');

router.all('/:uuid', function (req, res, next) {
    if (req.params.uuid != null && validator.isUUID(req.params.uuid, 4))
        next();
    else
        return res.status(401).json({ message: 'Invalid UUID' });
});

router.get('/', function (req, res, next) {
    mTypeCtrl.showAll(req, res);
});

router.get('/:uuid', function (req, res, next) {
    mTypeCtrl.show(req, res);
});

router.post('/', function (req, res, next) {
    mTypeCtrl.create(req, res);
});

router.put('/', function (req, res, next) {
    mTypeCtrl.update(req, res);
});

module.exports = router;