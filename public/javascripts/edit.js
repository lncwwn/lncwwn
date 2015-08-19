/**
 * edit post module
 *
 * @author victor li
 * @date 2015/08/15
 */

define(['common', 'wysiwyg'], function(com) {

    var editor = $('#editor').wysiwyg({
        classes: 'editor',
        toolbar: 'top-selection',
        buttons: {
                insertimage: {
                    title: '插入图片',
                    image: '\uf030'
                },
                insertlink: {
                    title: '插入链接',
                    image: '\uf08e'
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
            placeholderUrl: '网址，如www.google.com',
            maxImageSize: [600, 360],
            forceImageUpload: false,
            onImageUpload: function() {
                // TODO
            }
    });

    /**
     * 对富文本内容进行解析处理
     * @param content 要处理的内容 带html标记
     */
    function handleContent(content) {
        var tempDom = $('<div>').attr('id', 'content-handler').hide();
        $('body').append(tempDom);
        tempDom.html(content);
        // img tag <img>
        var imgTags = tempDom.find('img');
        // link tag <a href=''>***</a>
        var linkTags = tempDom.find('a');
        var imageDataArray = [];
        var linkTagsArray = [];
        imgTags.each(function(index, item) {
            imageDataArray.push($(item).attr('src'));
        });
        console.log(imageDataArray);
    }

    function getPost() {
        var id = $('#js-current-post').data('post-id');
        var title = $('input[name="title"]').val();
        //var content = $('textarea[name="content"]').val();
        var content = editor.wysiwyg('shell').getHTML();
        handleContent(content);
        return {
            id: id,
            title: title,
            content: content
        };
    }

    $('body')
    .off('click', '#js-submit-post')
    .on('click', '#js-submit-post', function(e) {
        e.preventDefault();
        var post = getPost();
        return;
        var currentUserId = com.getCurrentUserId();
        post.author = currentUserId;
        $.post('/posts/edit', post, function(data) {
            if (data && data.post) {
                com.showSuccess('文章发表成功');
            } else {
                com.showWarning('文章发表失败，请稍后重试');
            }
        });
    });

});