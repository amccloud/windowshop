define(function(require) {
    'use strict';

    var Products = require('../base/products');

    var ZapposProductImage = Products.Product.Image.extend({

    });

    var ZapposProduct = Products.Product.extend({
        parse: function(response, options) {
            var imageSrc = response.thumbnailImageUrl;

            return Products.Product.prototype.parse.call(this, {
                id: response.styleId,
                name: response.productName,
                thumbnailImage: this._getThumbnailImage(imageSrc),
                fullImage: this._getFullImage(imageSrc),
                price: response.price,
                url: response.productUrl
            }, options);
        },
        _convertImageRecipe: function(src, from, to) {
            return src.replace(from, to);
        },
        _getThumbnailImage: function(imageSrc) {
            return this._convertImageRecipe(imageSrc,
                ZapposProduct.IMAGE_RECIPE_THUMBNAIL,
                ZapposProduct.IMAGE_RECIPE_MULTIVIEW);
        },
        _getFullImage: function(imageSrc) {
            return this._convertImageRecipe(imageSrc,
                ZapposProduct.IMAGE_RECIPE_THUMBNAIL,
                ZapposProduct.IMAGE_RECIPE_4X);
        }
    }, {
        IMAGE_RECIPE_THUMBNAIL: 't-THUMBNAIL',
        IMAGE_RECIPE_MULTIVIEW: 'p-MULTIVIEW',
        IMAGE_RECIPE_4X: 'p-4x'
    });

    return Products.extend({
        model: ZapposProduct,

        url: function() {
            return 'http://api.zappos.com/Search?term=' + this.searchQuery;
        },
        sync: function(method, model, options) {
            options.dataType = 'jsonp';
            options.beforeSend = function(xhr, options) {
                options.url += '&key=eaadc98bce3692bda86dbbb684e62355d3b6c88a';
            };

            Products.prototype.sync.apply(this, arguments);
        },
        parse: function(response, options) {
            return Products.prototype.parse.call(this, response.results, options);
        }
    });
});
