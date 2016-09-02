var knex = require('knex');
var rods = require('rods');
var uuid = require('uuid');

var article = require('./models/article');
var blog    = require('./models/blog');
var user    = require('./models/user');

var db = function(config) {
  this.knex = knex(config);
  this.rods = rods(this.knex);
  this.id   = uuid.v1;

  this.rods.pre('save', function(args, data) {
    var timestamp = new Date();
    if (data._isNew) {
      data.id = uuid.v1();
      data.created_at = timestamp;
    }
    data.updated_at = timestamp;
  });

  //MODELS
  this.article = article(this.rods);
  this.user    = user(this.rods);
  this.blog    = blog(this.rods);

  return this;
}

module.exports = db;