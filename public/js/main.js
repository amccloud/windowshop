(function(require) {
    'use strict';

    require.config({
        shim: {
            'underscore': {
                exports: '_'
            }
        }
    });

    require(['client'], function(client) {
        client.start();
    });
})(require);
