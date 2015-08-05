/**
 * Client side
 *
 * @author victor li
 * @date 2015/08/05
 */

'use strict';

;(function($) {

    $('body')
    .off('click', '.js-navbar-toggle')
    .on('click', '.js-navbar-toggle', function() {
        $('.navbar-dropdown-panel').toggle();
    });

})(jQuery);