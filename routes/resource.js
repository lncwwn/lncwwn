let express = require('express');
let router = express.Router();
let QiNiu = require('../cloud/QiNiu');
let QiNiuConfig = require('../config/qiniu.config.json');
let gm = require('gm');
let fs = require('fs');

router.get('/uptoken', function(req, res, next) {
    const uptoken = QiNiu.getUptoken(QiNiuConfig.bucketName);
    res.json({
        uptoken: uptoken
    });
});

router.post('/avatar', function(req, res, next) {
    const imageBit = req.body.data;
    const x = req.body.x;
    const y = req.body.y;
    const x2 = req.body.x2;
    const y2 = req.body.y2;
    const width = x2 - x;
    const height = y2 - y;
    const base64Data = imageBit.replace(/^data:image\/png;base64,/, '');
    const binaryData = new Buffer(base64Data, 'base64').toString('binary');
    console.log(binaryData);
//    const cropped = imageMagick(imageBit, 'a.jpg').crop(x, y, width, height);
    const cropped = gm(binaryData, 'a.jpg').crop(x, y, width, height);
    cropped.write('/home/victor/d.jpg', function(a, b) {
       if (a) console.log(a);
       console.log(b);
    });
//    console.log(cropped);
    const uptoken = QiNiu.getUptoken(QiNiuConfig.bucketName);
    QiNiu.uploadBuf(uptoken, null, cropped.source, function(a, b) {
        if (!a) {
            //console.log(b);
        } else {
            //console.log(a);
        }
    });
});

module.exports = router;
