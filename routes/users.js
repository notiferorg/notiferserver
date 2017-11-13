var express = require('express'),
  conn = require('../controllers/user'),
  auth = require('../controllers/auth');

module.exports = (router) => {
  router.route('/auth/social')
    .post(auth.socialSignin, auth.generateAndSendToken);
  router.route('/auth/refresh')
    .post(auth.isRefreshAuthenticated, auth.refreshToken, auth.generateAndSendToken);
  router.route('/users')
    .get(auth.isLocalAuthenticated, conn.getusers)
    .post(conn.saveusers);
  router.route('/users/:id').delete(auth.isLocalAuthenticated, conn.deleteusers);
  router.route('/login').post(auth.authenticateUser, auth.generateAndSendToken);
}