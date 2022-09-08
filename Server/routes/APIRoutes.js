'use strict';

module.exports = function (app) {
  var api = require('../controllers/APIcontroller');

  app.post('/api/withdraw', api.withdraw);
};
