var conMerchantType = require('../controllers/merchantType'),
    validations = require('../helpers');

module.exports = (router) => {
    router.route('/merchant')
        .get(conMerchantType.showAll)
        .post(validations.isValidUDID, conMerchantType.create);

    router.route('/merchant/:uuid')
        .get(validations.isValidUDID, conMerchantType.show);
}