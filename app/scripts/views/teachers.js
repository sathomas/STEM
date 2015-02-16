/*global Stem, Backbone, JST*/

// Backbone view for the teacher-focused
// page of the application. This view is
// a parent view for various components
// and does not have an associated model
// or collection.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.Teachers = Backbone.View.extend({

        template: JST['app/scripts/templates/teachers.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {

            // Kick off the initialization process by
            // requesting data from the various
            // collections that will be a part of the
            // view.

            // Create the collection of completed proposals.

            this.completedProposals = new Stem.Collections.Proposals([], {
                historical: true,
                maxSize:    5
            });

            // Retrieve the data from DonorsChoose. We
            // want to trigger a reset when the fetch is
            // complete so that any associated views will
            // update automatically.

            this.completedProposals.fetch({reset: true});
        },

        render: function () {

            // Rendering this view is really nothing
            // more than creating and rendering the
            // appropriate child views.

            var proposalDetailList = new Stem.Views.CompletedProposalsAsFeaturedDetails({
                collection: this.completedProposals,
                el: $('#proposals-details')[0]
            });

            proposalDetailList.render();

        }

    });

})();
