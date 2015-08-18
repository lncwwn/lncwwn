require.config({
    paths: {
        'vue': '/vue/dist/vue.min',
        'jquery': '/jquery/dist/jquery.min',
        'bootstrap': '/bootstrap/dist/js/bootstrap.min',
        'jcrop': '/javascripts/lib/jquery.Jcrop.min',
        'wysiwyg': '/wysiwyg.js/dist/standalone.min',
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
        'wysiwyg': {
            deps: ['jquery']
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
