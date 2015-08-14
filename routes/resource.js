let express = require('express');
let router = express.Router();
let QiNiu = require('../cloud/QiNiu');
let QiNiuConfig = require('../config/qiniu.config.json');
let UserService = require('../services/UserService');
let gm = require('gm');

router.get('/up_token', function(req, res, next) {
    const upToken = QiNiu.getUpToken(QiNiuConfig.bucketName);
    res.json({
        upToken: upToken
    });
});

router.post('/avatar', function(req, res, next) {
    // image data
    const imageData = req.body.data;
    const x = req.body.x;
    const y = req.body.y;
    const x2 = req.body.x2;
    const y2 = req.body.y2;
    const width = x2 - x;
    const height = y2 - y;
    const userId = req.body.id;

    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(base64Data, 'base64');

    const avatarName = userId + new Date().getTime() + '.jpg';
    const TEMP_FILE = '/tmp/' + avatarName;
    const WIDTH_HEIGHT = 260;

    gm(buf).crop(width, height, x, y).resize(WIDTH_HEIGHT, WIDTH_HEIGHT).noProfile().write(TEMP_FILE , function(err) {
        if (!err) {

            const upToken = QiNiu.getUpToken(QiNiuConfig.bucketName);
            QiNiu.uploadFile(upToken, avatarName, TEMP_FILE, function(err, d) {
                if (!err) {
                    // update new avatar name in database
                    UserService.updateAvatar(userId, avatarName).then(function(user) {
                        res.json({updated: true, avatar: user.avatar});
                    });
                } else {
                    console.log(err);
                    res.json({updated: false});
                }
            });

        }
    });

});

module.exports = router;
