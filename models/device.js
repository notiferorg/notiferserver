var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('node-mongoose-validator')
//https://www.npmjs.com/package/node-mongoose-validator

/**
 * @swagger
 * definition:
 *   Device:
 *     properties:
 *       uuid:
 *         type: string
 *       name:
 *         type: string
 *       fcmid:
 *         type: string
 */
var schema = new Schema ({
    uuid: { type: String, unique: true, required: true },
    name: {type: String},
    fcmid: {type: String}
});

module.exports = mongoose.model('Device', schema);