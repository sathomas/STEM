/*global Stem, Backbone, JST*/

// Backbone view that renders a group object from
// the OAE as an individual item in a feature details
// component.


Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.GroupAsFeaturedDetailsItem = Backbone.View.extend({

        template: JST['app/scripts/templates/groupAsFeaturedDetailsItem.ejs'],

        tagName: 'div',

        id: '',

        className: 'featured__details__item',

        events: {},

        // Since this view is (for now) read-only, we stub out
        // the `initialize` function as unnecessary. We're leaving
        // the boilerplate as a comment, though, to make it easier
        // to add support for a dynamic model later, should that
        // be required.
        /*
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            return this;
        },
        */

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            // Return `this` for chaining.
            return this;
        }

    });

})();
