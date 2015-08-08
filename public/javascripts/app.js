/**
 * Client side
 *
 * @author victor li
 * @date 2015/08/05
 */

'use strict';

;(function($) {

    /**
     * 赞同文章
     *
     */
    function assentPost(that, userId, postId) {
        $.post('/posts/interact', {userId: userId, postId: postId}, function(data) {
            if (!data.error) {
                var count = data.count;
                $(that).find('.js-post-assent-count').text(count);
            }
        });
    }

    $('body')
    .off('mouseenter', '.js-navbar-toggle')
    .on('mouseenter', '.js-navbar-toggle', function(e) {
        e.stopPropagation();
        $('.navbar-dropdown-panel').toggle();
    }).on('mouseleave', 'div:not(".js-navbar-dropdown-area")', function(e) {
        $('.navbar-dropdown-panel').hide();
    }).on('click', '.js-show-post-content', function() {
        // 显示全文
        var parent = $(this).closest('.post-body');
        parent.find('.js-post-summary').addClass('hidden');
        parent.find('.js-post-content').removeClass('hidden');
        parent.find('.js-hide-post-content').removeClass('hidden');
        $(this).addClass('hidden');
    }).on('click', '.js-hide-post-content', function() {
        // 显示摘要
        var parent = $(this).closest('.post-body');
        parent.find('.js-post-content').addClass('hidden');
        parent.find('.js-post-summary').removeClass('hidden');
        parent.find('.js-show-post-content').removeClass('hidden');
        $(this).addClass('hidden');
    }).on('click', '.js-post-assent', function() {
        // 赞同文章
        var userId = $('#js-current-user').data('current-user');
        var postId = $(this).closest('.js-post-item').data('post-id');
        assentPost(this, userId, postId);
    }).on('click', '.js-post-oppose', function() {
        // 不赞成文章
        alert();
    });

})(jQuery);
