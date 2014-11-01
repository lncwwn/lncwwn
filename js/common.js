/**
 * common module
 */
(define(['jquery'], function($) {
	return {
		inputCheck: function() {
			var inputs = [];
			for (var i = 0; i < arguments.length; i++) {
				inputs.push(arguments[i]);
			}
			inputs.forEach(function(item, index) {
				if (!item || item === '') {
					return false;
				}
			});
			return true;
		}
	};
}));