/*global Stem, Backbone, JST*/

// Backbone view for a collection of proposals from
// DonorsChoose.org rendered as a set of detailed
// items in a featured list.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.CompletedProposalsAsFeaturedDetails = Backbone.View.extend({

        template: JST['app/scripts/templates/completedProposalsAsFeaturedDetails.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {

            // We want to watch for `reset` events on the collection.
            // For now, that's the only event we care about because
            // our collections aren't dynamic. (Once they're fetched
            // from DonorsChoose, they don't change.) In order to
            // trigger this event, the `{reset: true}` options should
            // be passed as arguments to the collection's `fetch()`
            // method.

            // Note that we don't need to listen for `change` events.
            // Backbone fires `change` events on a collection whenever
            // a model within that collection changes. Since our
            // models (like our collections) are static once they're
            // fetched from DonorsChoose, this event should not
            // occur. Even if that changes in the future, we let the
            // individual model views update themselves with any
            // changes since we're not directly rendering any aspect
            // of the individual models within this view.

            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {

            var $el = this.$el;

            // First render the overall template

            $el.html(this.template());

            // Then add the individual proposals

            this.collection.each(function (proposal) {

                // Create a view for the model.

                var proposalView = new Stem.Views.CompletedProposalAsFeaturedDetailsItem({
                    model: proposal
                });

                // Render it.

                proposalView.render();

                // And add it to the DOM.

                $el.find('.featured__details__listing').append(proposalView.el);

            });

            // Return the view for method chaining.

            return this;

        }

    });

})();
