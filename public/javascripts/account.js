/**
 * account setting module
 *
 * @author victor li
 * @date 2015/08/11
 */

define([], function() {

    function uploadAvatar() {
        $('#actual-avatar-upload').click();
    }

    $('body')
    .off('click', '#pretend-avatar-upload')
    .on('click', '#pretend-avatar-upload', function() { // 头像上传
        uploadAvatar();
    });

});
