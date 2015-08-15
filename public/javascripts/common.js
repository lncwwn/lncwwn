/**
 * common module
 *
 * @author victor li
 * @date 2015/08/15
 */

define([], function() {

    return {

        getCurrentUserId: function() {
            return $('#js-current-user').data('current-user');
        },

        showSuccess: function(msg) {
            var successPanel = $('#js-success-panel-common');
            successPanel.find('strong').text(msg);
            successPanel.removeClass('hidden');
            var id = setTimeout(function() {
                successPanel.addClass('hidden');
                clearTimeout(id);
            }, 3000);
        },

        showWarning: function(msg) {
            var warningPanel = $('#js-warning-panel-common');
            warningPanel.find('strong').text(msg);
            warningPanel.removeClass('hidden');
            var id = setTimeout(function() {
                warningPanel.addClass('hidden');
                clearTimeout(id);
            }, 3000);
        }

    };

});
