/**
 * edit post module
 *
 * @author victor li
 * @date 2015/08/15
 */
define(['common', 'simditor'], function(com, simditor) {

    function textAreaInit() {
        var editor = new Simditor({
            textarea: $('.js-edit-post-textarea'),
            toolbar: [
                        'bold',
                        'italic',
                        'underline',
                        'ol',
                        'ul',
                        'blockquote',
                        'hr',
                        'indent',
                        'outdent',
                        'alignment'
                     ]
        });
    }

    textAreaInit();

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
