/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsSecondarySearchGroup = Backbone.View.extend({

        template: JST['app/scripts/templates/oaeAsSecondarySearchGroup.ejs'],

        className: 'results-secondary-block',

        events: {
            'click .results-secondary__extras button': 'showExtras',
            'click .results-secondary__more   button': 'showAll'
        },

        render: function () {
            // First render the model's own template.
            this.$el.html(this.template(this.model.toJSON()));

            // Now add the collection of search results.
            var results = new Stem.Views.OaeAsSecondarySearchResults({
                collection: this.model.get('collection')
            });
            results.render();
            this.$el.find('h4').after(results.$el);

            return this; // for method chaining
        },

        showExtras: function () {
            this.trigger('expand', this);
        },

        showAll: function () {
            // Full results button was clicked, go there.
            Stem.Utils.redirect(this.model.get('moreLink'));
        }

    });

})();
