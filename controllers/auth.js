let passport = require('passport'),
    localStrategy = require('passport-local'),
    models = require('../models'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    HttpStatus = require('http-status-codes'),
    expressJwt = require('express-jwt');

passport.use(new localStrategy((username, password, done) => {
    models.user.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            // Password did not match
            if (!isMatch) { return done(null, false); }
            // Success
            return done(err, user);
        });
    });
}));

exports.socialSignin = (req, res, next) => {
    var type = req.headers['granttype'];
    var selecter = {};
    if (type == config.grantType.FACEBOOK) {
        selecter = { 'facebook.id': req.body.facebook.id };
    } else if (type == config.grantType.GOOGLE) {
        selecter = { 'google.id': req.body.google.id };
    }
    registerUser(req.body, type, selecter).then((result) => {
        req.user = result;
        next();
    }, (err) => {
        res.status(500).json(err);
    });

}

let registerUser = (profile, type, selecter) => {
    return new Promise((_resolve, _reject) => {
        var queryConditions = [];
        if (profile.username) {
            queryConditions.push({ username: profile.username });
        }
        //selecter = { 'facebook.id': profile.id } or { 'google.id': profile.id }
        if (selecter) {
            queryConditions.push(selecter);
        }

        if (type == config.grantType.CUSTOM) {
            let newUser = new models.user(profile);
            newUser.save((err) => {
                if (err) _reject(err);
                _resolve(newUser);
            });
        } else {
            // find the user in the database based on their facebook id
            models.user.findOne({ $or: queryConditions }, (err, user) => {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) _reject(err);
                // if the user is found, then log them in
                if (user) {
                    user[type].token = profile[type].token;
                    user.save();
                    _resolve(user);
                } else {
                    let newUser = new models.user(profile);
                    newUser.save((err) => {
                        if (err) _reject(err);
                        _resolve(newUser);
                    });
                }

            });
        }

    });
}

exports.refreshToken = (req, res, next) => {
    models.user.findOne({ _id: req.user.id, token: req.body.token }, (err, user) => {
        if (err) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
        } else {
            req.user = user;
            next();
        }
    });
}

exports.generateAndSendToken = (req, res) => {
    console.log(req.user);
    var token = jwt.sign({
        id: req.user.id || req.user._id,
    }, config.secret.KEY, {
            expiresIn: config.secret.EXPIRE_TIME
        });
    var refreshToken = jwt.sign({
        id: req.user.id || req.user._id,
    }, config.secret.REFRESHKEY);
    req.user.token = token;
    req.user.save();
    if (req.user && token) {
        res.status(HttpStatus.OK).json({
            token: token,
            refreshtoken: refreshToken,
            user: req.user
        })
    } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
    }

}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

exports.authenticateUser = passport.authenticate('local', { session: false });
exports.isLocalAuthenticated = expressJwt({ secret: config.secret.KEY });
exports.isRefreshAuthenticated = expressJwt({ secret: config.secret.REFRESHKEY });