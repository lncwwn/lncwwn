/**
 * QiNiu module
 *
 * @author victor li
 * @date 2015/08/09
 */

let qiniu = require('qiniu');
let config = require('../config/qiniu.config.json');

qiniu.conf.ACCESS_KEY = config.accessKey;
qiniu.conf.SECRET_KEY = config.secretKey;

let QiNiu = {

    /**
     * get upToken to upload resource
     * @param bucketName bucket name
     */
    getUpToken: function(bucketName) {
        let putPolicy = new qiniu.rs.PutPolicy(bucketName);
        return putPolicy.token();
    },

    uploadBuf: function(upToken, key, body, callback) {
        let extra = new qiniu.io.PutExtra();
        qiniu.io.put(upToken, key, body, extra, function(err, ret) {
            callback(err, ret);
        });
    },

    uploadFile: function(upToken, key, file, callback) {
        let extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(upToken, key, file, extra, function(err, ret) {
            callback(err, ret);
        });
    }

};

module.exports = QiNiu;

