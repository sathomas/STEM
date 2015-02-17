/*global Stem, Backbone, JST*/

// Backbone view for a collection of content from
// the OAE rendered as a set of detailed items in
// a featured list.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.ContentAsFeaturedDetails = Backbone.View.extend({

        template: JST['app/scripts/templates/contentAsFeaturedDetails.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {

            // We want to watch for `reset` and `sync` events on the
            // collection. For now, those are the only event we care
            // about because our collections aren't dynamic. (Once they're
            // fetched from the OAE, they don't change.)
            //
            // Note that we don't need to listen for `change` events.
            // Backbone fires `change` events on a collection whenever
            // a model within that collection changes. Since our
            // models (like our collections) are static once they're
            // fetched from the OAE, this event should not occur. Even
            // if that changes in the future, we let the individual
            // model views update themselves with any changes since
            // we're not directly rendering any aspect of the individual
            // models within this view.

            this.listenTo(this.collection, 'reset sync', this.render);
        },

        render: function () {

            var $el = this.$el;

            // First render the overall template

            $el.html(this.template());

            // Then add the individual content items

            this.collection.each(function (content) {

                // Create a view for the model.

                var contentView = new Stem.Views.ContentAsFeaturedDetailsItem({
                    model: content
                });

                // Render it.

                contentView.render();

                // And add it to the DOM.

                $el.find('.featured__details__listing').append(contentView.el);

            });

            // Return the view for method chaining.

            return this;
        }

    });

})();
