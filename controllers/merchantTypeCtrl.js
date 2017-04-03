var MerchantType = require('../models/merchantType');
var app = require('../app');

module.exports = {
    /**
     */
    create: function (req, res) {
        var mType = new MerchantType(req.body);
        var promise = mType.save();
        promise.then(function(merchantType) {
                return res.status(200).json(merchantType);
        })
        .catch(function(err){
            return res.status(409).json({
                    message: 'Error saving Merchant Type',
                    error: err
                });
        });
    },
    showAll: function (req, res) {
        var promise = MerchantType.find().exec();
        
        promise.then(function(merchantTypes) {
            if (!merchantTypes) {
                return res.status(404).json({
                    message: 'No such a merchant type'
                });
            }
            return res.status(200).json(merchantTypes); 
        })
        .catch(function(err){
            return res.status(500).json({
                message: 'Error getting merchant typs.'
            });
        });
    },
    show: function (req, res) {
        var uuid = req.params.uuid;
        var promise = MerchantType.findOne({ uuid: uuid }).exec();
        
        promise.then(function(merchantTypes) {
            if (!merchantTypes) {
                return res.status(404).json({
                    message: 'No such a merchant type'
                });
            }
            return res.status(200).json(merchantTypes); 
        })
        .catch(function(err){
            return res.status(500).json({
                message: 'Error getting merchant typs.'
            });
        });
    }
}