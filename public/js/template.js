define(function(require) {
    'use strict';

    var Marionette = require('backbone.marionette'),
        Handlebars = require('handlebars');

    _.extend(Marionette.TemplateCache.prototype, {
        loadTemplate: function(template) {
            return template;
        },
        compileTemplate: function(rawTemplate) {
            return Handlebars.compile(rawTemplate);
        }
    });
});
