/**
 * Operates resource, such as image
 *
 * @author victor li
 * @date 2015/08/19
 */

let QiNiu = require('../cloud/QiNiu');
let QiNiuConfig = require('../config/qiniu.config.json');
// to operate image
let gm = require('gm');

var ResourceService = {

    // 上传图片到云服务器
    uploadCloudImage: function(imageData) {

        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const buf = new Buffer(base64Data, 'base64');

        const avatarName = userId + new Date().getTime() + '.jpg';
        const TEMP_FILE = '/tmp/' + avatarName;
        const WIDTH_HEIGHT = 260;
    }

};

module.exports = ResourceService;
