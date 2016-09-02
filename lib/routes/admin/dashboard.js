var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/dashboard/index', {
    title: 'Dashboard'
  });
});

module.exports = router;