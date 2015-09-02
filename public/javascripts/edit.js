/**
 * edit post module
 *
 * @author victor li
 * @date 2015/08/15
 */

define(['common', 'wysiwyg'], function(com, wysiwyg) {

    /**
     * 一些初始化本页的操作，如清理掉缓存的图片信息
     */
    function init() {
        localStorage.setItem('photos', null);
    }

    var editor = $('#editor').wysiwyg({
        classes: 'editor',
        toolbar: 'top-selection',
        buttons: {
                insertimage: {
                    title: '插入图片',
                    image: '\uf030',
                    click: function($popup, $button) {
                        $('#js-insert-image').modal({
                            show: true,
                            backdrop: false
                        });
                        getToken();
                        generatePhotoName();
                    }
                },
                insertlink: {
                    title: '插入链接',
                    image: '\uf08e',
                    click: function() {
                        $('#js-insert-link').modal({
                            show: true,
                            backdrop: false
                        });
                    }
                },
                bold: {
                    title: '加粗',
                    image: '\uf032'
                },
                italic: {
                    title: '倾斜',
                    image: '\uf033',
                    hotkey: 'i'
                },
                underline: {
                    title: '下划线',
                    image: '\uf0cd',
                    hotkey: 'u'
                },
                strikethrough: {
                    title: '删除线',
                    image: '\uf0cc',
                    hotkey: 's'
                },
                forecolor: {
                    title: '字体颜色',
                    image: '\uf1fc'
                },
                highlight: {
                    title: '背景颜色',
                    image: '\uf043'
                },
                alignleft: {
                    title: '左对齐',
                    image: '\uf036'
                },
                aligncenter: {
                    title: '居中对齐',
                    image: '\uf037',
                },
                alignright: {
                    title: '右对齐',
                    image: '\uf038'
                },
                alignjustify: {
                    title: '两端对齐',
                    image: '\uf039'
                },
                subscript: {
                    title: '下标',
                    image: '\uf12c',
                },
                superscript: {
                    title: '上标',
                    image: '\uf12b'
                },
                indent: {
                    title: '缩进',
                    image: '\uf03c'
                },
                outdent: {
                    title: 'Outdent',
                    image: '\uf03b'
                },
                orderedList: {
                    title: '有序列表',
                    image: '\uf0cb'
                },
                unorderedList: {
                    title: '无序列表',
                    image: '\uf0ca'
                },
                removeformat: {
                    title: '清除格式',
                    image: '\uf12d'
                }
            },
            submit: {
                title: 'Submit',
                image: '\uf00c'
            },
            placeholder: '开始编辑文章',
            selectImage: '点击上传或拖拽文件到此',
            placeholderUrl: '网址，如www.lncwwn.com',
            maxImageSize: [680, 360],
            forceImageUpload: false,
            onImageUpload: function() {
                // TODO
            }
    });

    /**
     * 获取上传图片到七牛的token
     */
    function getToken() {
        $.get('/resource/photos/uptoken', function(res) {
            if (res) {
                var token = res.uptoken;
                $('input[name="token"]').val(token);
            }
        })
    }

    /**
     * 生成上传图片的名字
     */
    function generatePhotoName() {
        var name = com.getCurrentUserId() + '-' + (new Date()).getTime();
        $('input[name="key"]').val(name);
    }

    function uploadImageToCloud() {
        $('#js-upload-image-to-cloud').submit();
    }

    /**
     * 对富文本内容进行解析处理
     * @param content 要处理的内容 带html标记 TODO
     */
//    function handleContent(content) {
//        var tempDom = $('<div>').attr('id', 'content-handler').hide();
//        $('body').append(tempDom);
//        tempDom.html(content);
//        // img tag <img>
//        var imgTags = tempDom.find('img');
//        // link tag <a href=''>***</a>
//        var linkTags = tempDom.find('a');
//        var imageDataArray = [];
//        var linkTagsArray = [];
//        imgTags.each(function(index, item) {
//            imageDataArray.push($(item).attr('src'));
//        });
//        console.log(imageDataArray);
//    }

    /**
     * 获取标题和内容
     */
    function getPost() {
        var id = $('#js-current-post').data('post-id');
        var title = $('input[name="title"]').val();
        var content = editor.wysiwyg('shell').getHTML();

        return {
            id: id,
            title: title,
            content: content
        };
    }

    function uploadImage() {
        $('#js-actual-upload').get(0).value = '';
        $('#js-actual-upload').click();
    }

    var fileReader = new FileReader();
    // 若当前上传的图片已上传过，currentUploadLink将被赋值为已上传过的图片的link
    var image;

    /**
     * 检查图片是否上传过
     * @param imageData 图像的imagedata
     * @return 若返回有效的uploadedLink则表示该图片已上传过，本次不再重新上传
     */
    function hasImageUpload(imageData) {
        var uploadedLink;
        // 倒取imageData的随机100+个字符
        var length = (Math.random() * 100).toFixed(0) + 100;
        var currentSubImageData = imageData.substr(length);
        var uploaded = getRecentUpload();
        if (uploaded && uploaded.length > 0) {
            uploaded.forEach(function(item) {
                var itemSubImageData = item.image.substr(length);
                if (currentSubImageData === itemSubImageData) {
                    uploadedLink = item.link;
                }
            });
        }

        return uploadedLink;
    }

    fileReader.onload = function(e) {
        image = e.target.result;
        var tempImage = $('<img>').attr('id', 'js-temp-image').attr('src', image).hide();
        $('body').append(tempImage);
        var rawWidth = $('#js-temp-image').width(), rawHeight = $('#js-temp-image').height();
        tempImage.remove();

        uploadImageToCloud();

        // 在编辑器中显示图像
        insertImage(image, rawWidth, rawHeight);
    };

    $('iframe').onload = function(e) {
        var iframe = document.getElementById('iframe');
        console.log(iframe.contentWindow.document);
    };

    /**
     * add link into post
     */
    function insertLink(name, url) {
        var link = '<a href="' + url + '" target="_blank">' + name + '</a>';
        editor.wysiwyg('shell').insertHTML(link);
        $('#js-insert-link').modal('hide');
    }

    /**
     * add image into post
     */
    function insertImage(imageData, rawWidth, rawHeight) {
        var limitWidth = 500, limitHeight = 200, width = rawWidth, height = rawHeight;
        if (width >= height) {
            if (width > limitWidth) {
                var scale = height / width;
                width = limitWidth;
                height = scale * width;
            }
        } else {
            if (height > limitHeight) {
                var scale = width / height;
                height = limitHeight;
                width = scale * height;
            }
        }
        var image = '<img src="' + imageData + '" width=' + width + 'height='
            + height + 'data-raw-width=' + rawWidth + 'data-raw-height=' + rawHeight + '/>';
        editor.wysiwyg('shell').insertHTML(image);
        $('#js-insert-image').modal('hide');
    }

    /**
     * 随机截取两个图片相同位置的imagedata字符串进行比较，
     * 以此来判断是否该图片上传过
     */
    function compareImage(subImageData1, subImageData2) {
        if (subImageData1 === subImageData2) {
            return true;
        }

        return false;
    }

    /**
     * 把用户最近上传的图片imagedata和云链接存储在客户端
     */
    function storeRecentUpload(imageData, link) {
        var recentUpload = getRecentUpload();
        if (!recentUpload) {
            recentUpload = [];
        }
        var newUpload = {
            image: imageData,
            link: link
        };
        recentUpload.push(newUpload);
        localStorage.setItem('uploaded', recentUpload);
    }

    /**
     * 获取存储在客户端的用户最近上传的图片和地址
     */
    function getRecentUpload() {
        var recentUpload = localStorage.getItem('uploaded');
        if (recentUpload) {
            return JSON.parse(recentUpload);
        }
    }

    $('body')
    // open image upload dialog
    .off('click', '#js-pretend-upload')
    .on('click', '#js-pretend-upload', function() {
        uploadImage();
    })
    .on('change', '#js-actual-upload', function() {
        var files = this.files;
        if (files && files.length > 0) {
            var image = files[0];
            fileReader.readAsDataURL(image);
        }
    })
    .off('click', '#js-insert-link-confirm')
    .on('click', '#js-insert-link-confirm', function(e) {
        var name = $('input[name="link-name"]').val();
        var url = $('input[name="link-url"]').val();
        if ($.trim(name) && $.trim(url)) {
            insertLink(name, url);
        }
    })
    .off('click', '#js-submit-post')
    .on('click', '#js-submit-post', function(e) {
        e.preventDefault();
        var content = editor.wysiwyg('shell').getHTML();
        //handleContent(content);
        var post = getPost();
        if (!post.title) {
            com.showWarning('怎么没有标题呢？难道您也不知道自己在讲什么？');
            return;
        }
        if (!post.content) {
            com.showWarning('文章当然要有东西啦！空着可不好！');
            return;
        }
        var currentUserId = com.getCurrentUserId();
        post.author = currentUserId;
        $.post('/posts/edit', post, function(data) {
            if (data && data.post) {
                com.showSuccess('文章发表成功，即将跳转到文章详情...');
                var id = setTimeout(function() {
                    window.location.href = '/posts/post/' + data.post.id;
                    clearTimeout(id);
                }, 2000);
            } else {
                // TODO
                com.showWarning('文章发表失败，请稍后重试');
            }
        });
    });

});
