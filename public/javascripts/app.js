/**
 * Client side
 *
 * @author victor li
 * @date 2015/08/05
 */

'use strict';

;(function($) {

    $('body')
    .off('mouseenter', '.js-navbar-toggle')
    .on('mouseenter', '.js-navbar-toggle', function(e) {
        e.stopPropagation();
        $('.navbar-dropdown-panel').toggle();
    }).on('mouseleave', 'div:not(".js-navbar-dropdown-area")', function(e) {
        $('.navbar-dropdown-panel').hide();
    }).on('click', '.js-show-post-content', function() {
        var parent = $(this).closest('.post-body');
        parent.find('.js-post-summary').addClass('hidden');
        parent.find('.js-post-content').removeClass('hidden');
        parent.find('.js-hide-post-content').removeClass('hidden');
        $(this).addClass('hidden');
    }).on('click', '.js-hide-post-content', function() {
        var parent = $(this).closest('.post-body');
        parent.find('.js-post-content').addClass('hidden');
        parent.find('.js-post-summary').removeClass('hidden');
        parent.find('.js-show-post-content').removeClass('hidden');
        $(this).addClass('hidden');
    });

})(jQuery);