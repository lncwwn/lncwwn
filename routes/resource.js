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

router.post('/photos/upload', function(req, res, next) {
    const width = req.body.width;
    const height = req.body.height;
    const imageData = req.body.data;
    const userId = req.body.userId;

    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(base64Data, 'base64');

    const smImageName = userId + new Date().getTime() + 'xsm.jpg';
    const mdImageName = userId + new Date().getTime() + 'xmd.jpg';
    const userDir = path.join('/tmp', userId);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }

    const TEMP_SM_FILE = path.join(userDir, smImageName);
    const TEMP_MD_FILE = path.join(userDir, mdImageName);
    const SM_WIDTH = 500;
    const SM_HEIGHT = 200;
    const MD_WIDTH = 900;
    const MD_HEIGHT = 500;

    if (width >= height) {
        if (width > SM_WIDTH) {
            const scale = height / width;
            const newSMHeight = scale * SM_WIDTH;
            gm(buf).resize(SM_WIDTH, newSMHeight).noProfile().write(TEMP_SM_FILE, function(err) {
                if (!err) {
                    const upToken = QiNiu.getUpToken(QiNiuConfig.smallPhotoBucket);
                    QiNiu.uploadFile(upToken, smImageName, TEMP_SM_FILE, function(err, d) {
                        if (!err) {
                            res.json({
                                success: true,
                                smImageName: smImageName
                            });
                        } else {
                            res.json({
                                success: false
                            });
                        }
                    });
                }
            });
            if (width > MD_WIDTH) {
                const newMDHeight = scale * MD_WIDTH;
                gm(buf).resize(MD_WIDTH, newMDHeight).noProfile().write(TEMP_MD_FILE, function(err) {
                    if (!err) {
                        const upToken = QiNiu.getUpToken(QiNiuConfig.middlePhotoBucket);
                        QiNiu.uploadFile(upToken, mdImageName, TEMP_MD_FILE, function(err, d) {
                            //
                        });
                    }
                });
            }
        }
    } else {
        if (height > MD_HEIGHT) {
            // do scale
        } else if (height > SM_HEIGHT) {
            // do scale
        }
    }

});

module.exports = router;
