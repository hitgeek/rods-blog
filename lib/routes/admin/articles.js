var express = require('express');
var g       = require('../../globals');

var router = express.Router();

router.use('/', function(req, res, next) {
  g.db.blog.fetch({user_id: req.user.id}, function(err, data) {
    if (err) return next(err);
    res.locals.blogs = data;
    next()
  });
});

router.get('/', function(req, res, next) {
  g.db.article
      .select()
      .where({user_id: req.user.id})
      .populate('blog', g.db.blog.first(), function(x) {
        return ['id', x.blog_id];
      })
      .exec(function(err, data) {
        if (err) return next(err);
        res.locals.articles = data;
        next();
      });
});

router.get('/', function(req, res, next) {
  res.render('admin/articles/index', {
    title: 'Articles'
  });
});

router.get('/new', function(req, res, next) {
  res.render('admin/articles/new', {
    title: 'New Article'
  });
});

router.post('/new', function(req, res, next) {
  var a = new g.db.article(req.body);
  a.user_id = req.user.id;
  a.save(function(err) {
    if (err) return next(err);
    req.flash('success', 'Article created');
    res.redirect('/admin/articles');
  })
});

router.use('/:article', function(req, res, next) {
  g.db.article
        .first()
        .where({id: req.params.article})
        .populate('blog', g.db.blog.first(), function(x) {
          return ['id', x.blog_id];
        })
        .exec(function(err, data) {
          if (err) return next(err);
          res.locals.article = data;
          next();
        });
});

router.get('/:article/view', function(req, res, next) {
  res.render('admin/articles/view', {
    title: res.locals.article.title
  });
});


module.exports = router;