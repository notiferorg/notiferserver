var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @swagger
 * definition:
 *   Subscription:
 *     properties:
 *       uuid:
 *         type: string
 *       device_uuid:
 *         type: string
 *       description:
 *         type: string
 *       url:
 *         type: string
 *       createdTime:
 *         type: date
 */
var subscriptionSchema = new Schema ({
    deviceUuid: { type: String, unique: true, required: true },
    eventUuid: {type: String},
    status: {type: String},
    deliverdTime: {type: Date},
    viewedTime: {type: Date}
});

module.exports = mongoose.model('Subscription', subscriptionSchema);