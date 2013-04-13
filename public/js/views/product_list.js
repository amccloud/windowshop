define(function(require) {
    'use strict';

    var Marionette = require('backbone.marionette');

    var ProductRowView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'thumbnail-row',
        template: '<a href="{{fullImage}}"><img src="{{thumbnailImage}}"></a>',

        onShow: function() {
            this.$el.css('-webkit-transform', 'rotateY(' + this.options.angle + 'deg) translateZ(' + this.options.radius + 'px)');
        }
    });

    return Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'product-list',
        itemView: ProductRowView,
        collectionEvents: {
            'sync': 'rotateToIndex'
        },

        initialize: function() {
            _.bindAll(this);

            this.index = 0;
            this.firstResponder = true;

            $(document).on('keydown', this.onKeyDown).trigger('focus');
        },
        itemViewOptions: function(model, index) {
            return {
                radius: this._getRadius(),
                angle: this._getTheta() * index
            };
        },
        onKeyDown: function(event) {
            if (!this.firstResponder) {
                return;
            }

            var KEY_LEFT = 37,
                KEY_RIGHT = 39,
                KEY_SPACE = 32,
                KEY_ENTER = 13;

            if (event.which == KEY_LEFT) {
                this.index--;
                this.rotateToIndex();
                event.preventDefault();
            }

            if (event.which == KEY_RIGHT) {
                this.index++;
                this.rotateToIndex();
                event.preventDefault();
            }

            if (event.which == KEY_SPACE) {
                window.location = this.getCurrentlySelected().get('fullImage');
                event.preventDefault();
            }

            if (event.which == KEY_ENTER) {
                window.location = this.getCurrentlySelected().get('url');
                event.preventDefault();
            }
        },
        rotateToIndex: function() {
            var cameraZ = this._getRadius(),
                theta = this._getTheta(),
                rotation = this.index * theta * -1;

            this.$el.css('-webkit-transform', 'translateZ(-' + cameraZ + 'px) rotateY(' + rotation + 'deg)');
        },
        getCurrentlySelected: function() {
            return this.collection.at(this.index);
        },
        _getTheta: function() {
            return 360 / this.collection.length;
        },
        _getRadius: function() {
            return Math.round((480 / 2) / Math.tan(Math.PI / this.collection.length));
        }
    });
});
