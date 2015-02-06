/*global Stem, Backbone, JST, $*/

/*
 * Backbone view for a collection of proposals from
 * DonorsChoose.org rendered as a set of highlights
 * (i.e. "Editor's Choices").
 */

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.ProposalsAsHighlights = Backbone.View.extend({

        template: JST['app/scripts/templates/proposalsAsHighlights.ejs'],

        tagName: 'div',

        id: '',

        className: 'container',

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

            // First render the overall template

            this.$el.html(this.template());

            // Then add the individual proposals

            this.collection.each(function (proposal, idx) {

                // We render the individual proposals in rows of four,
                // so whenever the index is a multiple of four, we
                // start a new row.

                if (idx % 4 === 0) {
                    $('<div>').addClass('row').appendTo(this.$el);
                }

                // Create a view for the individual proposal, render
                // it, and add the Bootstrap class that designates it
                // as a row of 4. When creating the view, we're passing
                // in an explicit parent element instead of letting
                // the model view create it's own parent (which is the
                // default). We do that for a couple of reasons.
                //
                // First, we want to make sure that the element has
                // the appropriate Bootstrap class for rendering four
                // in a row. There's no need for the proposal view
                // to know how many are in a row, so we handle it
                // here.
                //
                // Second, there's a chance that, in the future, our
                // proposal models may be dynamic. If that's the case,
                // we want to defer completely to the models' views
                // to deal with any changes. If we let the model
                // view create the parent element, then any updates
                // would overwrite our changes, in particular, they
                // would remove the Bootstrap class that we need to
                // add.

                var proposalView = new Stem.Views.ProposalAsHighlight({
                    model: proposal,
                    el: $('<div>').addClass('col-sm-3').get(0)
                }).render();

                // Append the newly rendered proposal view to the
                // last row of the collection view.

                this.$('.row').last().append(proposalView.el);

            }, this);

            // return `this` for chaining

            return this;
        }

    });

})();
