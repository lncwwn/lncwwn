let express = require('express');
let router = express.Router();
let QiNiu = require('../cloud/QiNiu');
let QiNiuConfig = require('../config/qiniu.config.json');

router.get('/uptoken', function(req, res, next) {
    const uptoken = QiNiu.getUptoken(QiNiuConfig.bucketName);
    res.json({
        uptoken: uptoken
    });
});

module.exports = router;
