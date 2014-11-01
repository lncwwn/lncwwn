/**
 * defines path of system
 * @author Victor Li lncwwn@gmail.com
 * @date 2014/09/13
 */
define([], function() {
        return {
            routes: [
                {'site/index': 'index'},
                {'user/register': 'register'},
                {'user/login': 'login'},
                {'account/list': 'list'}
            ]
        };
});
