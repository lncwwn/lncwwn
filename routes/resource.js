/**
 * operates resource, such as image
 *
 * @author victor li
 * @date 2015/08/19
 */

let express = require('express');
let router = express.Router();
let QiNiu = require('../cloud/QiNiu');
let QiNiuConfig = require('../config/qiniu.config.json');
let Promise = require('bluebird');
let fs = require('fs');
let path = require('path');
let gm = require('gm');

router.get('/photos/uptoken', function(req, res, next) {
    QiNiu.getUpToken(QiNiuConfig.photoBucket).then(function(upToken) {
        res.json({
            uptoken: upToken
        });
    });
});

router.post('/photos/upload', function(req, res, next) {
    // TODO
});

module.exports = router;
