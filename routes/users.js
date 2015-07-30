var express = require('express');
var router = express.Router();
var UserService = require('../services/UserService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    UserService.findByNick('victor').then(function(user) {
        res.cookie('rememberme', '1', {expires: new Date(Date.now() + 900000), httpOnly: true}, 'login_user', user);
    });
});

module.exports = router;
