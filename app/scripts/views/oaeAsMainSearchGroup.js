/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsMainSearchGroup = Backbone.View.extend({

        template: JST['app/scripts/templates/oaeAsMainSearchGroup.ejs'],

        events: {
            'click button': 'clicked'
        },

        render: function () {
            // First render the model's own template.
            this.$el.html(this.template(this.model.toJSON()));

            // Now add the collection of search results.
            var results = new Stem.Views.OaeAsMainSearchResults({
                collection: this.model.get('collection')
            });
            results.render();
            this.$el.find('h3').after(results.$el);

            return this; // for method chaining
        },

        clicked: function () {
            // Show more button was clicked, go there.
            Stem.Utils.redirect(this.model.get('moreLink'));
        }

    });

})();
