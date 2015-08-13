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
     * get uptoken to upload resource
     * @param bucketName bucket name
     */
    getUptoken: function(bucketName) {
        let putPolicy = new qiniu.rs.PutPolicy(bucketName);
        return putPolicy.token();
    },

    uploadBuf: function(uptoken, key, body, callback) {
        let extra = new qiniu.io.PutExtra();

        qiniu.io.put(uptoken, key, body, extra, function(err, ret) {
            callback(err, ret);
        });
    }

};

module.exports = QiNiu;

