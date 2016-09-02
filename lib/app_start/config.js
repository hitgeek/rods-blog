var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var favicon      = require('serve-favicon');
var flash        = require('connect-flash');
var g            = require('../globals');
var logger       = require('morgan');
var moment       = require('moment');
var passport     = require('passport');
var path         = require('path');
var session      = require('express-session');
var KnexStore = require('connect-session-knex')(session);

module.exports.init = function(app) {

  app.set('views', path.join(__dirname, '../', 'views'));
  app.set('view engine', 'pug');
  //app.use(favicon(path.join(__dirname, '../','public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../', 'public')));
  app.use(session({
		secret: '__secret__',
		resave: true,
		saveUninitialized: true,
    store: new KnexStore({ knex: g.db.knex })
	}));
  app.use(passport.initialize());
	app.use(passport.session());
  app.use(flash());

  app.use(function(req, res, next) {
    res.locals.moment = moment;
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.path = req.path;
    next();
  });
}

