var Merchant = require('../models').merchant

module.exports = {

    /**
     * merchantController.show()
     */
    show: function (req, res) {
        Merchant.findOne({ uuid: req.params.uuid }, (err, merchant) => {
            if (err) res.status(500).json(err);
            res.status(200).json(merchant);
        });
    },

    /**
    * merchantController.update() || merchantController.create()
    */
    createOrUpdate: function (req, res) {
        Merchant.findOneAndUpdate({ uuid: req.body.uuid }, { $set: req.body }, { new: true, upsert: true }, (err, doc) => {
            if (err) res.status(400).json(err);
            res.status(200).json(doc);
        });
    },

    /**
    * merchantController.remove()
    */
    remove: function (req, res) {
        Merchant.remove({ uuid: req.params.uuid }, (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json(result);
        });
    }
    
}