var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('node-mongoose-validator') 

/**
 * @swagger
 * definition:
 *   MerchantType:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       image_url:
 *         type: string
 */
var schema = new Schema ({
    name: {type: String},
    description: {type: String},
    image_url: {type: String},
},{ autoIndex: false});

module.exports = mongoose.model('MerchantType', schema);