var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/planning', function(req, res, next) {
  res.render('planning', { title: 'Planning' });
});

router.get('/forecast', function(req, res, next) {
  res.render('forecast', { title: 'Forecast', data: req.query.data, payroll: req.query.payroll, planned: req.query.planned });
});

module.exports = router;
