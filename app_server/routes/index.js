var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');

// Main routes
router.get('/', ctrlMain.index);
router.get('/travel', ctrlTravel.travel);

// Static page routes
router.get('/about', function(req, res) {
  res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact' });
});

router.get('/faq', function(req, res) {
  res.render('faq', { title: 'FAQ' });
});

router.get('/rooms', function(req, res) {
  res.render('rooms', { title: 'Rooms' });
});

router.get('/meals', function(req, res) {
  res.render('meals', { title: 'Meals' });
});

router.get('/news', function(req, res) {
  res.render('news', { title: 'News' });
});

module.exports = router;
