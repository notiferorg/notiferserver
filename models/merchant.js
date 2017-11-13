var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @swagger
 * definition:
 *   Merchant:
 *     properties:
 *       uuid:
 *         type: string
 *       name:
 *         type: string
 *       mtype:
 *         type: integer
 *       url:
 *         type: string
 *       email:
 *         type: string
 *       address:
 *         type: string
 *       street:
 *         type: string
 *       city:
 *         type: string
 *       country:
 *         type: string
 *       postalcode:
 *         type: string
 *       isVerified:
 *         type: boolean
 *       merchantTypeId:
 *         type: string
 * 
 */
var merchantSchema = new Schema ({
    uuid: { type: String, unique: true, required: true },
    name: {type: String},
    mtype: {type: Number},
    url: {type: String},
    email: {type: String},
    address: {type: String},
    street: {type: String},
    city: {type: String},
    country: {type: String},
    postalcode: {type: String},
    isVerified:{type: Boolean, default:0},
    merchantTypeId:[{ type: Schema.Types.ObjectId, ref: 'MerchantType', required: true }]
});

module.exports = mongoose.model('Merchant', merchantSchema);