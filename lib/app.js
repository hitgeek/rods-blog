var auth    = require('./app_start/auth');
var config  = require('./app_start/config');
var db      = require('./data/db');
var errors  = require('./app_start/errors');
var express = require('express');
var globals = require('./globals');
var routes  = require('./app_start/routes');

var app = express();

if (process.env.NODE_ENV == 'development') {
  var conn = require('../knexfile')[process.env.NODE_ENV];
  globals.db = db(conn);
} else {
  //get db config from environment variables
}

config.init(app);
routes.init(app);
errors.init(app);
auth.init();

module.exports = app;
