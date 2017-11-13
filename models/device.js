var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
var deviceSchema = new Schema ({
    uuid: { type: String, unique: true, required: true },
    name: {type: String},
    fcmid: {type: String}
});

module.exports = mongoose.model('Device', deviceSchema);