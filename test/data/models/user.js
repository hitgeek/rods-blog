var assert = require('assert');
var g      = require('../../globals');

describe('user', function() {
  describe('.save()', function() {
    it('should save a user', function(done) {
      var u = new g.db.user({
        email: 'test@email.com',
        password: 'p@ssw0rd',
        name: 'Test User'
      });

      u.save(function(err, data) {
        assert(!err);
        done();
      });
    });
  });
  describe('.get()', function() {
    it('should get a user', function(done) {
      g.db.user.get({name: 'Test User'}, function(err, u) {
        assert(!err);
        assert(u.id);
        assert(u.email, 'test@email.com');
        assert(u.password, 'p@ssw0rd');
        done();
      })
    })
  });
  describe('.create()', function() {
    it('should create a user', function(done) {
      var data = {
        email: 'bob@email.com',
        password: 'pass',
        confirmPassword: 'pass',
        name: 'Bob'
      }
      g.db.user.create(data, function(err, u) {
        assert(!err);
        u.save(function(err) {
          assert(!err);
          done();
        });
      });
    });
  });
  describe('.fetch()', function() {
    it('should fetch users', function(done) {
      g.db.user.fetch({}, function(err, data) {
        assert(!err);
        assert(data.length, 2);
        done();
      });
    });
  })
})