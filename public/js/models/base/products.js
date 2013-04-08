define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    var ProductImage = Backbone.Model.extend({

    });

    var Product = Backbone.Model.extend({
        parse: function(response) {
            if (response.price) {
                response.price = this._cleanPrice(response.price);
            }

            return response;
        },
        _cleanPrice: function(value) {
            return value.replace('$', '');
        }
    }, {
        Image: ProductImage
    });

    return Backbone.Collection.extend({
        initialize: function(models, options) {
            this.searchQuery = options.searchQuery || '';
        }
    }, {
        Product: Product
    });
});
