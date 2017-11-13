var uuid = require('uuid4'),
    validator = require('validator');

exports.isValidUDID = (req, res, next) => {
    var uuid = req.body.uuid || req.query.uuid || req.headers['uuid'] || req.params.uuid;
    // TODO check null This library (validator.js) validates strings only
    if (uuid != null && validator.isUUID(uuid, 4)) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid UUID' });
    }
}