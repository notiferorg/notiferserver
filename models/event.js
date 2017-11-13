var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @swagger
 * definition:
 *   Event:
 *     properties:
 *       uuid:
 *         type: string
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       url:
 *         type: string
 *       createdTime:
 *         type: date
 *       expiredTime:
 *         type: date
 *       sendNow:
 *         type: boolean
 */
var eventSchema = new Schema ({
    uuid: { type: String, unique: true, required: true },
    title: {type: String},
    description: {type: String},
    url: {type: String},
    createdTime: {type: Date},
    expiredTime: {type: Date},
    sendNow: {type: Boolean}
});

module.exports = mongoose.model('Event', eventSchema);