var Device = require('../models/device');
var app = require('../app');

module.exports = {
    /**
     * deviceController.create()
     */
    create: function (req, res) {
        var device = new Device(req.body);
        var promise = device.save();

        promise.then(function(device){
             return res.status(200).json(device);
        })
        .catch(function(err){
            return res.status(409).json({
            message: 'Error saving Device',
            error: err
            });
        });
    },
    /**
    * deviceController.remove()
    */
    remove: function (req, res) {
        var uuid = req.params.uuid;
        var promise = Device.findOne({ uuid: uuid }).exec();

        promise.then(function(device){
            if (device != null) {
                return device.remove();
            } else {
                return res.status(404).json({
                    message: 'Device does not exist'
                });
            }
        })
        .then(function(device){
            return res.status(200).json(device);
        })
        .catch(function(err){
             return res.status(500).json({
                 message: 'Error device was not deleted'
            });
        });
    },

    /**
    * deviceController.remove()
    */
    update: function (req, res) {
        var rdevice = new Device(req.body);
        var promise = Device.findOneAndUpdate({ uuid: rdevice.uuid },
            {
                $set: { name: rdevice.name } // TODO if Device has more feilds update this 
            },
            {
                new: true,       // retun updated object orelse set false 
                upsert: false    // set true to insert if the device is not exist 
            }).exec();

            promise.then(function(device){
                if (device != null) {
                    return res.status(202).json(device);
                } else {
                    return res.status(404).json({
                        message: 'Device does not exist'
                    });
                }
            }).catch(function(err){
                return res.status(500).json({
                        message: 'Error saving device'
                });
            });
    },
    /**
     * deviceCtrl.show()
     */
    show: function (req, res) {
        var uuid = req.params.uuid;
        var promise = Device.findOne({ uuid: uuid }).exec();
        promise.then(function(device) {
            if (!device) {
                return res.status(404).json({
                    message: 'No such a device'
                });
            } 
            return res.status(200).json(device);
        })
        .catch(function(err){
            return res.status(500).json({
                message: 'Error getting device.',
                error: err
            });
        });
    }
};