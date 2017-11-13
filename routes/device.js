var conDevice = require('../controllers/device'),
    validations = require('../helpers');

module.exports = (router) => {
    router.route('/device')
        .post(validations.isValidUDID, conDevice.createOrUpdate);

    router.route('/device/:uuid')
        .delete(validations.isValidUDID, conDevice.remove)
        .get(validations.isValidUDID, conDevice.show);
}