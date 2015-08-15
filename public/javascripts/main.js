require.config({
    paths: {
        'vue': '/vue/dist/vue.min',
        'jquery': '/jquery/dist/jquery.min',
        'bootstrap': '/bootstrap/dist/js/bootstrap.min',
        'simditor': '/simditor/lib/simditor',
        'simditor-hotkeys': '/simple-hotkeys/lib/hotkeys',
        'simditor-module': '/simple-module/lib/module',
        'simditor-uploader': '/simple-uploader/lib/uploader',
        'jcrop': '/javascripts/lib/jquery.Jcrop.min',
        'config': '/javascripts/config',
        'common': '/javascripts/common',
        'global': '/javascripts/global',
        'posts': '/javascripts/posts',
        'edit': '/javascripts/edit',
        'account': '/javascripts/account'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'simditor': {
            deps: ['simditor-hotkeys', 'simditor-module', 'simditor-uploader']
        },
        'jcrop': {
            deps: ['jquery'],
            exports: 'jQuery.Jcrop'
        }
    }
});

require(['jquery', 'bootstrap'], function($, bootstrap) {
    $(document).ready(function() {
        var modules = $('script[data-module]');
        if (modules && modules.length) {
            for (var i = 0; i < modules.length; i++) {
                var module = modules[i], name = $(module).attr('data-module');
                require([name], function(m) {
                    if (m && m.init) {
                        m.init();
                    }
                });
            }
        }
    });
});
