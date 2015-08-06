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
    var nick = req.body['nick'];
    var password = req.body['password'];
    var rememberMe = req.body['remember-me'];

    if (nick && password) {
        UserService.findByNick(nick).then(function(user) {
            if (user.password === password) {
                var cookieUser = user;
                req.session.currentUser = user;
                req.session.save(function(err) {
                    console.log(err);
                });
                res.redirect('/');
            } else {
                res.render('login', {error: 'error'});
            }
        });
    } else {
        res.render('login', {error: 'no nick or password passed'});
    }

});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        console.log(err);
        res.redirect('/');
    });
});

module.exports = router;
