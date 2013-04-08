define(function(require) {
    'use strict';

    var Marionette = require('backbone.marionette');

    var ProductRowView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'thumbnail-row',
        template: '<a href="{{fullImage}}" style="background-image: url({{thumbnailImage}});"></a>'
    });

    return Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'product-list',
        itemView: ProductRowView
    });
});
