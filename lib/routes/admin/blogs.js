var express = require('express');
var g       = require('../../globals');

var router = express.Router();

router.get('/', function(req, res, next) {
  g.db.blog.fetch({user_id: req.user.id}, function(err, data) {
    if (err) return next(err);
    res.locals.blogs = data;
    next()
  });
});

router.get('/', function(req, res, next) {
  res.render('admin/blogs/index', {
    title: 'Blogs'
  });
});

router.get('/new', function(res, res, next) {
  res.render('admin/blogs/new', {
    title: 'New Blog'
  });
});

router.post('/new', function(req, res, next) {
  var b = new g.db.blog(req.body);
  b.user_id = req.user.id;
  b.save(function(err) {
    if (err) return next(err);
    req.flash('Blog created');
    res.redirect('/admin/blogs');
  });
});

router.use('/:blog', function(req, res, next) {
  g.db.blog.get(req.params.blog, function(err, b) {
    if (err) return next(err);
    res.locals.blog = b;
    next();
  });
});

router.get('/:blog/view', function(req, res, next) {
  res.render('admin/blogs/view', {
    title: res.locals.blog.name
  });
});



module.exports = router;