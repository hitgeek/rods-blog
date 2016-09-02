var bcrypt         = require('bcrypt');
var g              = require('../globals.js');
var LocalStrategy  = require('passport-local').Strategy;
var passport       = require('passport');

module.exports.init = function() {

  var local = new LocalStrategy(function(username, password, done) {
    g.db.user.get({email: username}, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'User not found'});
      bcrypt.compare(password, user.password, function(err, res) {
        if (err) return done(err);
        if (!res) return done(null, false, {message: 'Incorrect Password'});
        done(null, user);
      });
    });
  });

  passport.use(local);

  passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
    g.db.user.get(id, done);
	});

}

module.exports.authenticated = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Must be logged in to access this page.')
    return res.redirect('/login');
  }
  next();
}