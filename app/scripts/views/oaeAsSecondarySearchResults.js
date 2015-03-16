/*global Stem, Backbone */

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsSecondarySearchResults = Backbone.View.extend({

        tagName: 'ul',

        className: 'results-secondary__list',

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            this.reset();
            this.collection.each(function(model, idx) {
                // No more than two results in a secondary listing
                if (idx < 2) {
                    this.add(model);
                }
            }, this);
            return this; // for method chaining
        },

        reset: function () {
            this.$el.empty();
            return this; // for method chaining
        },

        add: function(model) {
            var view = new Stem.Views.OaeAsSecondarySearchResult({model: model});
            this.$el.append(view.render().$el);
            return this; // for method chaining
        }

    });

})();
