var auth  = require('./auth');
var index = require('../routes/index');

var admin_articles  = require('../routes/admin/articles');
var admin_blogs     = require('../routes/admin/blogs');
var admin_dashboard = require('../routes/admin/dashboard');


module.exports.init = function(app) {
  app.use('/', index);


  app.use('/admin', auth.authenticated);
  app.use('/admin/articles', admin_articles);
  app.use('/admin/blogs', admin_blogs);
  app.use('/admin/dashboard', admin_dashboard);
}