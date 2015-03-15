/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsMainSearchResults = Backbone.View.extend({

        tagName: 'ul',

        className: 'results-main__list',

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            this.reset();
            this.collection.each(function(model) {
               this.add(model);
            }, this);
            return this; // for method chaining
        },

        reset: function () {
            this.$el.empty();
            return this; // for method chaining
        },

        add: function(model) {
            var view = new Stem.Views.OaeAsMainSearchResult({model: model});
            this.$el.append(view.render().$el);
            return this; // for method chaining
        }

    });

})();
