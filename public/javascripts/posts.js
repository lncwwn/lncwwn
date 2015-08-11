/**
 * posts module
 *
 * @author victor li
 * @date 2015/08/11
 */

define([], function() {

    /**
     * 赞同文章
     * @param userId
     * @param postId
     */
    function assentPost(that, userId, postId) {
        $.post('/posts/interact', {userId: userId, postId: postId}, function(data) {
            if (!data.error) {
                var count = data.count;
                $(that).find('.js-post-assent-count').text(count);
            }
        });
    }

    /**
     * 收起摘要，显示全文
     */
    function showContent($that) {
        var postBody = $that.closest('.post-body');
        var interact = $that.closest('.post-panel').find('.post-interact');
        postBody.find('.js-post-summary').addClass('hidden');
        postBody.find('.js-post-content').removeClass('hidden');
        postBody.find('.js-hide-post-content').removeClass('hidden');
        $that.addClass('hidden');
        interact.find('.js-post-interact-info').addClass('hidden');
        interact.find('.js-post-interact-fun').removeClass('hidden');
    }

    /**
     * 收起全文，显示摘要
     */
    function showSummary($that) {
        var postBody = $that.closest('.post-body');
        var interact = $that.closest('.post-panel').find('.post-interact');
        postBody.find('.js-post-content').addClass('hidden');
        postBody.find('.js-post-summary').removeClass('hidden');
        postBody.find('.js-show-post-content').removeClass('hidden');
        $that.addClass('hidden');
        interact.find('.js-post-interact-fun').addClass('hidden');
        interact.find('.js-post-interact-info').removeClass('hidden');
    }

    $('body')
    .off('click', '.js-show-post-content')
    .on('click', '.js-show-post-content', function() { // 显示全文
        showContent($(this));
    })
    .off('click', '.js-hide-post-content')
    .on('click', '.js-hide-post-content', function() { // 显示摘要
        showSummary($(this));
    })
    .off('click', '.js-post-assent')
    .on('click', '.js-post-assent', function() { // 赞同文章
        var userId = $('#js-current-user').data('current-user');
        var postId = $(this).closest('.js-post-interact').data('post-id');
        assentPost(this, userId, postId);
    })
    .off('click', '.js-post-oppose')
    .on('click', '.js-post-oppose', function() { // 不赞同文章
        alert();
    })
    .off('click', '#js-edit-post-link')
    .on('click', '#js-edit-post-link', function(e) {
        e.stopPropagation();
        editPost();
    })
    .off('click', '.js-resize-edit-panel')
    .on('click', '.js-resize-edit-panel', function() {
        if (!editPanelFullScreen) {
            expandEditPanel(this);
            editPanelFullScreen = true;
        } else {
            resetEditPanel(this);
            editPanelFullScreen = false;
        }

    });

});
