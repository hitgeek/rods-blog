var db       = require('../lib/data/db');
var g        = require('./globals');
var knexfile = require('../knexfile');


before(function(done) {
  g.db = db(knexfile[process.env['NODE_ENV']]);
  console.log('migrating database...');
  g.db.knex.migrate.latest().then(function() {
    console.log('database migrate completed');
    done();
  });
})

after(function(done) {
  var save = process.env['TEST_OPT']
  if (!save) {
    knex.raw('delete from users')
    .then(function() {
      done()
    });
  } else {
    done();
  }
})