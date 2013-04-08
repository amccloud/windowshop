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
            var thumbnailSrc = this._convertImageRecipe(imageSrc,
                ZapposProduct.IMAGE_RECIPE_THUMBNAIL,
                ZapposProduct.IMAGE_RECIPE_MULTIVIEW);

            if (thumbnailSrc.indexOf(ZapposProduct.IMAGE_RECIPE_MULTIVIEW) === -1) {
                thumbnailSrc = this._convertImageRecipe(imageSrc,
                    ZapposProduct.IMAGE_RECIPE_THUMBNAIL_LEGACY,
                    ZapposProduct.IMAGE_RECIPE_MULTIVIEW_LEGACY);
            }

            return thumbnailSrc;
        },
        _getFullImage: function(imageSrc) {
            var fullSrc = this._convertImageRecipe(imageSrc,
                ZapposProduct.IMAGE_RECIPE_THUMBNAIL,
                ZapposProduct.IMAGE_RECIPE_4X);

            if (fullSrc.indexOf(ZapposProduct.IMAGE_RECIPE_4X) === -1) {
                fullSrc = this._convertImageRecipe(imageSrc,
                    ZapposProduct.IMAGE_RECIPE_THUMBNAIL_LEGACY,
                    ZapposProduct.IMAGE_RECIPE_4X_LEGACY);
            }

            return fullSrc;
        }
    }, {
        IMAGE_RECIPE_THUMBNAIL: 't-THUMBNAIL.jpg',
        IMAGE_RECIPE_MULTIVIEW: 'p-MULTIVIEW.jpg',
        IMAGE_RECIPE_4X: 'p-4x.jpg',
        IMAGE_RECIPE_THUMBNAIL_LEGACY: 't.jpg',
        IMAGE_RECIPE_MULTIVIEW_LEGACY: 'p.jpg',
        IMAGE_RECIPE_4X_LEGACY: 'p.jpg'
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
