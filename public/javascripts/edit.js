/**
 * edit post module
 *
 * @author victor li
 * @date 2015/08/15
 */

define(['common', 'wysiwyg'], function(com) {

    $('#editor').wysiwyg({
        classes: 'editor',
        toolbar: 'top-selection',
        buttons: {
                insertimage: {
                    title: '插入图片',
                    image: '\uf030',
                    popup: function($popup, $button) {
                        $popup.append( $('<h3>dsdsds</h3>') );
                    },
                    click: function($button) {
                        console.log($button);
                    }
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
            }
    });

    function getPost() {
        var id = $('#js-current-post').data('post-id');
        var title = $('input[name="title"]').val();
        var content = $('textarea[name="content"]').val();
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
