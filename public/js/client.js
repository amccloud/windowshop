define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Marionette = require('backbone.marionette'),
        Products = require('models/zappos/products'),
        ProductListView = require('views/product_list');

    require('./template');

    var client = new Marionette.Application();

    client.addRegions({
        mainRegion: '#main'
    });

    var searchResults = new Products([], {
        searchQuery: window.location.search.slice(1) || 'vans'
    });

    var searchResultsView = new ProductListView({
        collection: searchResults
    });

    client.mainRegion.show(searchResultsView);
    searchResults.fetch();

    return client;
});
