var router = require('express').Router();
var uuid = require('uuid4');
var validator = require('validator');
var config = require('../config');

var apiVersion = config.apiVersion;
var merchantCtrl = require('../controllers/merchantCtrl');

/* default marchant router response */
router.all('/', function (req, res, next) {

    // TODO check null This library (validator.js) validates strings only
    if (req.body.uuid != null && validator.isUUID(req.body.uuid, 4))
        next();
    // return res.status(200).json({ message: 'Valid UUID' });
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
 * /merchant:
 *   post:
 *     tags:
 *       - Merchant
 *     description: add new merchant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: merchant
 *         description: merchant object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Merchant'
 *     responses:
 *       200:
 *         description: merchant details 
 *         schema:
 *           $ref: '#/definitions/Merchant'
 *       409:
 *         description: Error saving Merchant
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.post('/', function (req, res, next) {
    merchantCtrl.create(req, res);
});

/**
 * @swagger
 * /merchant/{uuid}:
 *   delete:
 *     tags:
 *       - Merchant
 *     description: delete merchant using uuid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: uuid
 *         description: merchant's uuid
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: merchant details 
 *         schema:
 *           $ref: '#/definitions/Merchant'
 *       404:
 *         description: merchant not found 
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error occured when retreiving merchant. 
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.delete('/:uuid', function (req, res, next) {
    merchantCtrl.remove(req, res);
});

/**
 * @swagger
 * /merchant:
 *   put:
 *     tags:
 *       - Merchant
 *     description: add new merchant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: merchant
 *         description: merchant object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Merchant'
 *     responses:
 *       202:
 *         description: merchant details 
 *         schema:
 *           $ref: '#/definitions/Merchant'
 *       404:
 *         description: 'Merchant does not exist'
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error occured when updating the merchant. 
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.put('/', function (req, res, next) {
    merchantCtrl.update(req, res);
});

/**
 * @swagger
 * /merchant/{uuid}:
 *   get:
 *     tags:
 *       - Merchant
 *     description: get merchant using uuid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: uuid
 *         description: merchant's uuid
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: merchant details 
 *         schema:
 *           $ref: '#/definitions/Merchant'
 *       404:
 *         description: merchant not found 
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error occured when retreiving merchant. 
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get('/:uuid', function (req, res, next) {
    merchantCtrl.show(req, res);
});

module.exports = router;