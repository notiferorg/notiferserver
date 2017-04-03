var router = require('express').Router();
var uuid = require('uuid4');
var validator = require('validator');
var config = require('../config');

var apiVersion = config.apiVersion;
var deviceCtrl = require('../controllers/deviceCtrl');

/* default device router response */
router.all('/', function (req, res, next) {

    // TODO check null This library (validator.js) validates strings only
    if (req.body.uuid != null && validator.isUUID(req.body.uuid, 4))
        next();
    else
        return res.status(401).json({ message: 'Invalid UUID' });
});

router.all('/:uuid', function (req, res, next) {

    if (req.params.uuid != null && validator.isUUID(req.params.uuid, 4))
        next();
    else
        return res.status(401).json({ message: 'Invalid UUID' });
});

/**
 * @swagger
 * /device:
 *   post:
 *     tags:
 *       - Device
 *     description: add new device
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: device
 *         description: device object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Device'
 *     responses:
 *       200:
 *         description: device details 
 *         schema:
 *           $ref: '#/definitions/Device'
 *       409:
 *         description: Error saving Device
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.post('/', function (req, res, next) {
    deviceCtrl.create(req, res);
});

/**
 * @swagger
 * /device/{uuid}:
 *   delete:
 *     tags:
 *       - Device
 *     description: delete device using uuid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: uuid
 *         description: device's uuid
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: device details 
 *         schema:
 *           $ref: '#/definitions/Device'
 *       404:
 *         description: device not found 
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error occured when retreiving device. 
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.delete('/:uuid', function (req, res, next) {
    deviceCtrl.remove(req, res);
});

/**
 * @swagger
 * /device:
 *   put:
 *     tags:
 *       - Device
 *     description: update device
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: device
 *         description: device object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Device'
 *     responses:
 *       202:
 *         description: device details 
 *         schema:
 *           $ref: '#/definitions/Device'
 *       404:
 *         description: 'Device does not exist'
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error occured when updating the device. 
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.put('/', function (req, res, next) {
    deviceCtrl.update(req, res);
});

/**
 * @swagger
 * definition:
 *   Error:
 *     properties:
 *       message:
 *         type: string
 *       err:
 *         type: string
 */

/**
 * @swagger
 * /device/{uuid}:
 *   get:
 *     tags:
 *       - Device
 *     description: get device using uuid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: uuid
 *         description: device's uuid
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: device details 
 *         schema:
 *           $ref: '#/definitions/Device'
 *       404:
 *         description: device not found 
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error occured when retreiving device. 
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get('/:uuid', function (req, res, next) {
    deviceCtrl.show(req, res);
});

module.exports = router;