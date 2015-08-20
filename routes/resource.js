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
let gm = require('gm');

router.post('/photos/upload', function(req, res, next) {
    console.log(req.body);
});

module.exports = router;
