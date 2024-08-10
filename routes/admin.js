var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  res.render('admin/signin', {title:'Admin Signin'});
});

router.get('/subjects', function(req, res, next) {
  res.render('admin/subjects', {title:'Subjects'});
});

router.get('/students', function(req, res, next) {
  res.render('admin/students', {title:'Students'});
});

router.get('/faculty', function(req, res, next) {
  res.render('admin/faculty', {title:'Faculties'});
});

router.get('/attendance', function(req, res, next) {
  res.render('admin/attendance', {title:'Attendance'});
});

module.exports = router;
