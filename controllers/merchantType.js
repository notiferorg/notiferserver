var MerchantType = require('../models').merchantType

module.exports = {

    /**
    * merchantTypeController.showAll()
    */
    showAll: function (req, res) {
        MerchantType.find((err, merchantTypes) => {
            if (err) res.status(500).json(err);
            res.status(200).json(merchantTypes);
        });
    },

    /**
    * merchantTypeController.show()
    */
    show: function (req, res) {
        MerchantType.findOne({ uuid: req.params.uuid }, (err, merchantType) => {
            if (err) res.status(500).json(err);
            res.status(200).json(merchantType);
        });
    },

    /**
    * merchantTypeController.create()
    */
    create: function (req, res) {
        let merchantType = new MerchantType(req.body);
        merchantType.save((err, result) => {
            if (err) res.status(400).json(err);
            res.status(200).json(result);
        });
    }

}