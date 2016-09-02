var express  = require('express');
var g        = require('../globals');
var passport = require('passport');

var router = express.Router();

router.get('/', function(req, res, next) {
  var blog = req.hostname.split('.')[0];
  if (blog == 'rods-blog') return next();

  var articles = g.db.article
                      .select()
                      .populate('user', g.db.user.first(), function(x) {
                        return ['id', x.user_id]
                      });

  g.db.blog.first()
      .where({domain: blog})
      .populate('articles', articles, function(x) {
        return ['blog_id', x.id];
      })
      .exec(function(err, b) {
        if (err) return next(err);
        res.locals.blog = b;
        next();
      });
});

router.get('/', function(req, res, next) {
  if (res.locals.blog) {
    res.render('index/blog', {
      title: res.locals.blog.name
    });
  } else {
    res.render('index/index', {
      title: 'Rods Blog'
    });
  }
});

router.get('/register', function(req, res, next) {
  res.render('index/register', {
    title: 'Register'
  });
});

router.post('/register', function(req, res, next) {
  g.db.user.create(req.body, function(err, u) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/register');
    }
    u.save(function(err) {
      if (err) return next(err);
      res.redirect('/login');
    })
  });
});

router.get('/login', function(req, res, next) {
  res.render('index/login', {
    title: 'Log In'
  });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  successRedirect: '/admin/dashboard'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Sucessfully logged out');
  res.redirect('/login');
});

module.exports = router;
