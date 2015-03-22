/*global Stem, Backbone, JST*/

// Simple Bacbone view to show OAE information
// as a "spotlight" list item.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsSpotlightItem = Backbone.View.extend({

        template: JST['app/scripts/templates/oaeAsSpotlightItem.ejs'],

        tagName: 'li',

        className: 'spotlight__item',

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this; // for method chaining
        }

    });

})();
