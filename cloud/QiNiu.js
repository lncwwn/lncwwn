/**
 * QiNiu module
 *
 * @author victor li
 * @date 2015/08/09
 */

let qiniu = require('qiniu');
let config = require('../config/qiniu.config.json');
let promise = require('bluebird');

qiniu.conf.ACCESS_KEY = config.accessKey;
qiniu.conf.SECRET_KEY = config.secretKey;

let QiNiu = {

    /**
     * get upToken to upload resource
     * @param bucketName bucket name
     */
    getUpToken: function(bucketName) {
        return new Promise(function(resolve, reject) {
            let putPolicy = new qiniu.rs.PutPolicy(bucketName);
            return resolve(putPolicy.token());
        });
    },

    uploadBuf: function(upToken, key, body) {
        return new Promise(function(resolve, reject) {
            let extra = new qiniu.io.PutExtra();
            qiniu.io.put(upToken, key, body, extra, function(err, ret) {
                if (!err) {
                    return resolve(ret);
                }

                return reject(err);
            })
        });
    },

    uploadFile: function(upToken, key, file) {
        return new Promise(function(resolve, reject) {
            let extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(upToken, key, file, extra, function(err, ret) {
                if (!err) {
                    return resolve(ret);
                }

                return reject(err);
            });
        });
    }

};

module.exports = QiNiu;

