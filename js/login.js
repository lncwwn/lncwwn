/**
 * login module
 * required jquery
 * @author victor lncwwn@gmail.com
 * @date 2014/10/12
 */

(define(['jquery'], function($) {
	$('body').on('click', '.js-login-btn', function(e) {
		e.preventDefault();
		var _name = $('.input[name="nick"]').val(),
			_passwd = $('.input[name="passwd"]').val();
		if (_name && _passwd) {
			$.post('login', {nick: _name, passwd: _passwd},
				function(data, status) {
					console.log(status);
				});
		} else {
			// TODO
		}
	});
	return {
		init: function() {
			//alert('login');
		},
	};
}));