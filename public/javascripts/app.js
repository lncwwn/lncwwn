/**
 * Client side
 *
 * @author victor li
 * @date 2015/08/05
 */

'use strict';

;(function($, window, undefined) {

    var editPanelFullScreen = false;

    /**
     * 在页面加载后做一些初始化动作
     */
    function pageInit() {
        // TODO
    }

    pageInit();

    /**
     * 创建／编辑文章
     */
    function editPost() {
        textAreaInit();
        $('#js-edit-post-panel').modal({
            show: true,
            backdrop: false
        });
    }

    function textAreaInit() {
        var editor = new Simditor({
            textarea: $('#js-edit-post-textarea'),
            toolbar: [
                        'bold',
                        'italic',
                        'underline',
                        'color',
                        'ol',
                        'ul',
                        'blockquote',
                        'code',
                        'table',
                        'hr',
                        'indent',
                        'outdent',
                        'alignment'
                     ]
        });
    }

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
     * 最大化文章编辑面板
     */
    function expandEditPanel(that) {
        $('#js-edit-post>.edit-post')
        .removeClass('col-md-6 col-md-offset-3')
        .addClass('col-md-12')
        .css('top', '5%');
        $(that).text('还原');
    }

    /**
     * 还原文章编辑面板
     */
    function resetEditPanel(that) {
        $('#js-edit-post>.edit-post')
        .removeClass('col-md-12')
        .addClass('col-md-6 col-md-offset-3')
        .css('top', '10%');
        $(that).text('全屏');
    }

    function closeEditPanel() {
        $('#js-edit-post>.edit-post').addClass('hidden');
        $('#mask').addClass('hidden');
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
        // 不赞同文章
        alert();
    }).on('click', '#js-edit-post-link', function(e) {
        e.stopPropagation();
        editPost();
    }).on('click', '.js-resize-edit-panel', function() {
        if (!editPanelFullScreen) {
            expandEditPanel(this);
            editPanelFullScreen = true;
        } else {
            resetEditPanel(this);
            editPanelFullScreen = false;
        }

    }).on('click', '.js-close-edit-panel', function() {
        closeEditPanel();
        var currentHash = window.location.hash;
        var hash = currentHash.replace('#edit_post', '');
        window.location.hash = hash;
    });

})(jQuery, window);
