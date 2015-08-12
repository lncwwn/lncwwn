/**
 * account setting module
 *
 * @author victor li
 * @date 2015/08/11
 */

define(['jcrop'], function(Jcrop) {

    var fileReader = new FileReader();
    var types = ['png', 'jpg', 'jpeg'];
    var jcropApi;

    fileReader.onload = function(e) {
        avatarReview(e.target.result);
    };

    function loadImage() {
        var upload = $('#actual-avatar-upload').get(0).files;
        if (upload.length === 0) return;
        var file = upload[0];
        fileReader.readAsDataURL(file);
    }

    function avatarReview(data) {
        if (jcropApi) jcropApi.destroy();
        $('#avatar-selector').attr('src', data);
        addJcrop();
        $('#js-avatar-select-area').modal({
            show: true,
            backdrop: false
        });
    }

    function addJcrop() {
        $('#avatar-selector').Jcrop({
            onSelect: function() {},
            addClass: 'avatar-jcrop',
            bgColor: 'black',
            boxHeight: 500,
            bgOpacity: .4,
            handleSize: 6,
            setSelect: [100, 100, 600, 600],
            minSize: [260, 260],
            aspectRatio: 1
        }, function() {
            jcropApi = this;
        });
    }

    function uploadAvatar() {
        $('#actual-avatar-upload').click();
    }

    $('body')
    .off('click', '#pretend-avatar-upload')
    .on('click', '#pretend-avatar-upload', function() { // 头像上传
        uploadAvatar();
    }).on('change', '#actual-avatar-upload', function() {
        loadImage();
        $('#actual-avatar-upload').get(0).value = '';
    });

});
