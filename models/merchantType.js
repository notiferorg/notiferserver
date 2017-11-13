var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
var merchantTypeSchema = new Schema ({
    name: {type: String},
    description: {type: String},
    image_url: {type: String},
},{ autoIndex: false});

module.exports = mongoose.model('MerchantType', merchantTypeSchema);