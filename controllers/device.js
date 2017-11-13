var Device = require('../models').device

module.exports = {

    /**
     * deviceCtrl.show()
     */
    show: function (req, res) {
        Device.findOne({ uuid: req.params.uuid }, (err, device) => {
            if (err) res.status(500).json(err);
            res.status(200).json(device);
        });
    },

    /**
    * deviceController.remove() || deviceController.create()
    */
    createOrUpdate: function (req, res) {
        Device.findOneAndUpdate({ uuid: req.body.uuid }, { $set: req.body }, { new: true, upsert: true }, (err, doc) => {
            if (err) res.status(400).json(err);
            res.status(200).json(doc);
        });
    },

    /**
    * deviceController.remove()
    */
    remove: function (req, res) {
        Device.remove({ uuid: req.params.uuid }, (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json(result);
        });
    }

};