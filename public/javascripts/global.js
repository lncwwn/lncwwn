/**
 * global module
 *
 * @author victor li
 * @date 2015/08/11
 */

define([], function() {

    /**
     * 检测古老的浏览器
     *
     * @return boolean
     */
    function checkOldAgent() {
        var mode;
        if (mode = document.documentMode && mode < 9) {
            return false;
        }

        return true;
    }

    function showWarning() {
        if (!checkOldAgent()) {
            $('#js-warning-panel').removeClass('hidden');
        }
    }

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

    function closeEditPanel() {
        $('#js-edit-post>.edit-post').addClass('hidden');
        $('#mask').addClass('hidden');
    }

    function textAreaInit() {
        var editor = new Simditor({
            textarea: $('#js-edit-post-textarea'),
            toolbar: [
                        'bold',
                        'italic',
                        'underline',
                        'ol',
                        'ul',
                        'blockquote',
                        'table',
                        'hr',
                        'indent',
                        'outdent',
                        'alignment'
                     ]
        });
    }

    /**
     * 在页面加载后做一些初始化动作
     */
    function pageInit() {
        showWarning();
    }

    pageInit();

    $('body')
    .off('mouseenter', '.js-navbar-toggle')
    .on('mouseenter', '.js-navbar-toggle', function(e) { // 用户菜单下拉
        e.stopPropagation();
        $('.navbar-dropdown-panel').toggle();
    })
    .off('mouseleave', 'div:not(".js-navbar-dropdown-area")')
    .on('mouseleave', 'div:not(".js-navbar-dropdown-area")', function(e) { // 用户菜单收起
        $('.navbar-dropdown-panel').hide();
    })
    .off('click', '#js-edit-post-link')
    .on('click', '#js-edit-post-link', function(e) { // 弹出文章编辑面板
        e.stopPropagation();
        editPost();
    })
    .off('click', '.js-close-edit-panel')
    .on('click', '.js-close-edit-panel', function() { // 关闭文章编辑面板
        closeEditPanel();
    });

});
