/**
 * account setting module
 *
 * @author victor li
 * @date 2015/08/11
 */

define(['config', 'jcrop'], function(config, Jcrop) {

    var fileReader = new FileReader();
    var fileReader2 = new FileReader();
    var types = ['image/png', 'image/jpg', 'image/jpeg'];
    var jcropApi, avatar;

    fileReader.onload = function(e) {
        avatar = e.target.result;
        avatarReview(avatar);
    };

    /**
     * filter by image size and type
     */
    function imageFilter(image) {
        if (image) {
            // max size is 1mb
            if (image.size > 1024 * 1000) return false;
            if (types.indexOf(image.type) < 0) return false;
        }

        return true;
    }

    function loadImage() {
        var upload = $('#actual-avatar-upload').get(0).files;
        if (upload.length === 0) return;
        var file = upload[0];
        if (imageFilter(file)) {
            fileReader.readAsDataURL(file);
        } else {
            showWarning('图像尺寸过大或格式不合法');
        }
    }

    function showSuccess(msg) {
        var successPanel = $('#js-success-panel-common');
        successPanel.find('strong').text(msg);
        successPanel.removeClass('hidden');
        var id = setTimeout(function() {
            successPanel.addClass('hidden');
            clearTimeout(id);
        }, 3000);
    }

    function showWarning(msg) {
        var warningPanel = $('#js-warning-panel-common');
        warningPanel.find('strong').text(msg);
        warningPanel.removeClass('hidden');
        var id = setTimeout(function() {
            warningPanel.addClass('hidden');
            clearTimeout(id);
        }, 3000);
    }

    function getPosition(image) {
        var realWidth = image.width, realHeight = image.height, scale = realWidth / realHeight, height = realHeight;
        var width = height * scale, min = height;
        if (width < height) {
            min = width;
        }
        // 选择区域正方形中心坐标
        var center = [width / 2, height / 2];
        // 按照黄金比例计算正方形的边长
        var side = (-1 * min + Math.sqrt(Math.pow(min, 2) + 4 * Math.pow(min, 2))) / 2;
        var x = (width - side) / 2;
        var y = (height - side) / 2;
        return {
            x: x,
            y: y,
            side: side,
            width: width,
            height: height
        };
    }

    function avatarReview(data) {
        if (jcropApi) jcropApi.destroy();
        var image = $('#avatar-selector').attr('src', data);
        var point = getPosition(image.get(0));
        addJcrop(point);
        $('#js-avatar-select-area').modal({
            show: true,
            backdrop: false
        });
    }

    function updateAvatar(avatarUrl) {
        var avatarHeader = $('#avatar-header');
        var avatarImg = $('#pretend-avatar-upload');
        avatarHeader.attr('src', avatarUrl);
        avatarImg.attr('src', avatarUrl);
    }

    function addJcrop(point) {
        $('#avatar-selector').Jcrop({
            addClass: 'avatar-jcrop',
            bgColor: 'black',
            boxHeight: (function() {return point.height > 500 ? 500 : point.height})(),
            boxHeight: 500,
            bgOpacity: .4,
            handleSize: 6,
            setSelect: [point.x, point.y, point.x + point.side, point.y + point.side],
            aspectRatio: 1
        }, function(selection) {
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
    }).on('click', '#submit-avatar-select', function() {
        var c = jcropApi.tellSelect();
        var userId = $('#js-current-user').data('current-user');
        if (c.w && c.h) {
            var x = c.x, y = c.y, x2 = c.x2, y2 = c.y2;
            var avatarSelectPanel = $('#js-avatar-select-area');
            $.post('/resource/avatar', {data: avatar, x: x, y: y, x2: x2, y2: y2, id: userId}, function(data) {
                if (data) {
                    if (data.updated) {
                        var avatarUrl = config.qiNiuUrl + data.avatar;
                        avatarSelectPanel.modal('hide');
                        updateAvatar(avatarUrl);
                        showSuccess('头像更新成功！');
                    } else {
                        showWarning('头像更新失败');
                    }
                }
            });
        } else {
            // TODO
        }
    });

});
