var express = require('express');
var router = express.Router();
var UserService = require('../services/UserService');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.session.currentUser) {
        var id = req.session.currentUser.id;
        res.redirect('/users/' + id);
    } else {
        res.redirect('/users/login');
    }
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: '用户登录'});
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

router.get('/:id', function(req, res, next) {
    var userId = req.params.id;
    UserService.findById(userId).then(function(user) {
        res.render('profile', {user: user});
    });
});

module.exports = router;
