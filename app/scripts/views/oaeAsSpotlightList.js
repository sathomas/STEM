/*global Stem, Backbone, $ */

// Simple Backbone view to render an OAE
// collection as a list of spotlight items.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsSpotlightList = Backbone.View.extend({

        tagName: 'ul',

        className: 'spotlight',

        // We watch for click events to toggle the
        // visibility of spotlight items.

        events: {
            'click': 'toggleVisibility'
        },

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'add', this.add);
        },

        render: function () {

            // Clear out any old content

            this.reset();

            // Iterate through the groups in the
            // collection, adding them to the view.

            this.collection.each(this.add, this);

            return this; // for method chaining
        },

        reset: function () {
            this.$el.empty();
            return this; // for method chaining
        },

        add: function (oae) {

            // For a newly added model, create a
            // new view, render it, and append it
            // to the list.

            this.$el.append(
                new Stem.Views.OaeAsSpotlightItem({
                    model: oae
                }).render().$el
            );

        },

        toggleVisibility: function (ev) {

            // Which specific item was clicked? It's
            // either the clicked target or the first
            // parent of the clicked target with the
            // appropriate class.

            var $clicked = $(ev.target);
            $clicked = $clicked.hasClass('spotlight__item') ?
                $clicked : $clicked.parents('.spotlight__item');

            // Toggle the explanded class on that item.

            $clicked.toggleClass('spotlight__item--expanded');

            // For all other items, clear the expanded
            // class.

            this.$el.find('.spotlight__item').not($clicked)
                .removeClass('spotlight__item--expanded');

        }

    });

})();
