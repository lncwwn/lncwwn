(require.config({
    // BASE_URL was defined in themes/sky/layouts/main.php
    baseUrl: BASE_URL + '/js',
    paths: {
        jquery: 'jquery-1.11.1',
        'common': 'common',
        'register': 'register',
        'login': 'login'
    }
}),
// init each modules
require(['route'], function(route) {
    var routes = route.routes,
        currRoute = location.href;
    for (var i = 0; i < routes.length; i++) {
        var curr = routes[i];
        for (var key in curr) {
            if (currRoute.indexOf(key) > 0) {
                require([curr[key]], function(obj) {
                    if (obj && obj.init) {
                        obj.init();
                    }
                });
            }
        }
    }
})
)();
