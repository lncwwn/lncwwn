let express = require('express');
let router = express.Router();
let UserService = require('../services/UserService');
let Promise = require('bluebird');
let gm = Promise.promisifyAll(require('gm'));
let QiNiu = require('../cloud/QiNiu');
let QiNiuConfig = require('../config/qiniu.config.json');
let path = require('path');
let fs = Promise.promisifyAll(require('fs'));

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.session.currentUser) {
        let id = req.session.currentUser.id;
        res.redirect('/users/' + id);
    } else {
        res.redirect('/users/login');
    }
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: '用户登录'});
});

router.post('/login', function(req, res, next) {
    const nick = req.body['nick'];
    const password = req.body['password'];
    const rememberMe = req.body['remember-me'];

    if (nick && password) {
        UserService.findByNick(nick).then(function(user) {
            if (user.password === password) {
                let cookieUser = user;
                cookieUser.password = null;
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

router.get('/profile/:id', function(req, res, next) {
    const userId = req.params.id;
    UserService.findById(userId).then(function(user) {
        res.render('profile', {user: user});
    });
});

// account setting, login is needed
router.get('/account', function(req, res, next) {
    if (!req.session.currentUser) {
        res.render('login');
    }
    res.render('account');
});

// avatar setting
router.post('/avatar', function(req, res, next) {
    // image data
    const imageData = req.body.data;
    const x = req.body.x;
    const y = req.body.y;
    const x2 = req.body.x2;
    const y2 = req.body.y2;
    const width = x2 - x;
    const height = y2 - y;
    const userId = req.body.id + '';

    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(base64Data, 'base64');

    const avatarName = userId + new Date().getTime() + '.jpg';
    const userDir = path.join('/tmp', userId);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }
    const TEMP_FILE = path.join(userDir, avatarName);
    // 上传后的头像图片尺寸要求260＊260
    const SIZE = 260;

    gm(buf).crop(width, height, x, y).resize(SIZE, SIZE).noProfile().write(TEMP_FILE, function(err) {
        if (!err) {
            QiNiu.getUpToken(QiNiuConfig.avatarBucket).then(function(upToken) {
                QiNiu.uploadFile(upToken, avatarName, TEMP_FILE).then(function(d) {
                    // update new avatar name in database
                    UserService.updateAvatar(userId, avatarName).then(function(user) {
                        req.session.currentUser = user;
                        res.json({updated: true, avatar: user.avatar});
                    });
                }).catch(function(err) {
                    req.json({updated: false});
                });
            });
        } else {
            req.json({updated: false});
        }
    })

});

module.exports = router;
