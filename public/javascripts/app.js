/**
 * Client side
 *
 * @author victor li
 * @date 2015/08/05
 */

'use strict';

;(function($) {

    $('body')
    .off('click', '.js-navbar-toggle').on('click', '.js-navbar-toggle', function(e) {
        e.stopPropagation();
        $('.navbar-dropdown-panel').toggle();
    }).on('click', 'div:not(".js-navbar-dropdown-area")', function(e) {
        $('.navbar-dropdown-panel').hide();
    });

})(jQuery);