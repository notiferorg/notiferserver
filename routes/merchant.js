
var conMerchant = require('../controllers/merchant'),
    validations = require('../helpers');

module.exports = (router) => {
    router.route('/merchant')
        .post(validations.isValidUDID, conMerchant.createOrUpdate);

    router.route('/merchant/:uuid')
        .delete(validations.isValidUDID, conMerchant.remove)
        .get(validations.isValidUDID, conMerchant.show);
}