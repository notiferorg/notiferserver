var User = require('../models').user;

module.exports = {

    getusers: (req, res) => {
        User.find((err, users) => {
            if (err) res.status(500).json(err);
            res.status(200).json(users);
        });
    },

    saveusers: (req, res) => {
        let user = new User(req.body);
        user.save((err, result) => {
            if (err) res.status(400).json(err);
            res.status(200).json(result);
        });
    },
    
    deleteusers: (req, res) => {
        User.remove({ _id: req.param('id') }, (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json(result);
        });
    }

}