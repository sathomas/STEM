/*global Stem, Backbone, JST*/

// Backbone view for a single proposal from DonorsChoose.org
// rendered as a highlight (i.e. "Editor's Choice").

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.ProposalAsHighlight = Backbone.View.extend({

        template: JST['app/scripts/templates/proposalAsHighlight.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        // Since this view is (for now) read-only, we stub out
        // the `initialize` function as unnecessary. We're leaving
        // the boilerplate as a comment, though, to make it easier
        // to add support for a dynamic model later, should that
        // be required.
        /*
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        */

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            // return `this` for chaining
            return this;
        }

    });

})();
