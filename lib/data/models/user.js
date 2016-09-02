var async  = require('async');
var bcrypt = require('bcrypt');

var model = function(rods) {
  var m = rods.model('users');

  m.create = function(data, callback) {
    var user;
    async.waterfall([
      function(next) {
        m.get({email: data.email}, next)
      },
      function(u, next) {
        if (u) return next('User already exists');
        next();
      },
      function(next) {
        if (data.password != data.confirmPassword) {
          return next('Passwords do not match');
        }
        if (data.password == '') {
          return next('Password can not be blank');
        }
        next()
      },
      function(next) {
        delete data.confirmPassword;
        bcrypt.hash(data.password, 10, next);
      },
      function(hash, next) {
        data.password = hash;
        user = new m(data);
        next()
      }
    ], function(err) {
      callback(err, user);
    })
  }

  return m;
}

module.exports = model