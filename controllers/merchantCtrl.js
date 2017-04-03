var Merchant = require('../models/merchant');
var app = require('../app');

module.exports = {
    /**
     */
    create: function (req, res) {
        var merchant = new Merchant(req.body);
        var promise = merchant.save();
        promise.then(function(merchant){
             return res.status(200).json(merchant);
        })
        .catch(function(err){
            return res.status(409).json({
                    message: 'Error saving Merchant',
                    error: err
                });
        });
    },
    /**
    * merchantController.remove()
    */
    remove: function (req, res) {
        var uuid = req.params.uuid;
        var promise = Merchant.findOne({ uuid: uuid }).exec();

        promise.then(function(merchant){
             if (merchant != null) {
               return merchant.remove(); 
            } else {
                return res.status(404).json({
                    message: 'merchant does not exist'
                });
            }
        }).then(function(merchant){
            return res.status(200).json(merchant);
        })
        .catch(function(err){
            return res.status(500).json({
                    message: 'Error merchant was not deleted'
                });
        });
    },

    /**
    * merchantController.update()
    */
    update: function (req, res) {
        var rmerchant = new Merchant(req.body);
        var promise = Merchant.findOneAndUpdate({ uuid: rmerchant.uuid },
            {
                $set: {
                    name: rmerchant.name, 
                    url: rmerchant.url,
                    email: rmerchant.email, 
                    address: rmerchant.address,
                    street: rmerchant.street, 
                    city:rmerchant.city, 
                    country: rmerchant.country,
                    postalcode: rmerchant.postalcode,
                    isVerified: rmerchant.isVerified,
                    merchantTypeId: rmerchant.merchantTypeId
                } // TODO if merchant has more feilds update this 
            }, {
                new: true,       // retun updated object orelse set false 
                upsert: true    // set true to insert if the merchant is not exist 
            }).exec();
            
            promise.then(function (merchant) {
                if (merchant != null) {
                    return res.status(202).json(merchant.populate('merchantTypeId'));
                } else {
                    return res.status(404).json({
                        message: 'Merchant does not exist'
                    });
                }
            })
            .catch(function(err){
                    return res.status(400).json({
                        message: 'Error saving merchant'
                    });
            });
    },
    /**
     * merchantController.show()
     */
    show: function (req, res) {
        var uuid = req.params.uuid;
        var promis = Merchant.findOne({ uuid: uuid })
        // .populate('merchantTypeId')
        .exec();
        
        promis.then(function(merchant) {
            if (!merchant) {
                return res.status(404).json({
                    message: 'No such a merchant'
                });
            }
            return res.status(200).json(merchant);
        })
        .catch(function(err){
                return res.status(500).json({
                    message: 'Error getting merchant.'
                });
        });
    }
    
}