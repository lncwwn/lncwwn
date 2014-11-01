/**
 * register module
 * required jquery
 * @author victor lncwwn@gmail.com
 * @date 2014/09/13
 */

(define(['jquery', 'common'], function($, common) {
	$('body').on('click', '.js-reg-btn', function(e) {
		e.preventDefault();
		var _nick = $.trim($('input[name="nick"]').val()),
			_passwd = $.trim($('input[name="passwd"]').val()),
			_passwdCheck = $.trim($('input[name="_passwd"]').val()),
			_email = $.trim($('input[name="email"]').val());
			if (common.inputCheck(_nick, _passwd, _passwdCheck, _email)) {
				if (_passwd !== _passwdCheck) {
					alert('passwd');
				} else {
					$.post(
						'register',
						{nick: _nick, passwd: _passwd, email: _email},
						function(data, status) {
							console.log(data);
						});
				}
			}
	});
        return {
            init: function() {
                //alert('init');
            }
        };
}));
