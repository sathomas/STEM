/*global Stem, $, Backbone, JST*/

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

            // Create a collection of content objects

            this.content = new Stem.Collections.Content([], {
                limit: 99
            });

            // Populate it from the OAE.

            this.content.fetch();

            // Create the collection of completed proposals.

            this.completedProposals = new Stem.Collections.Proposals([], {
                historical: true,
                maxSize:    5
            });

            // Retrieve the data from DonorsChoose.

            this.completedProposals.fetch();

        },

        render: function () {

            // Rendering this view is really nothing
            // more than creating and rendering the
            // appropriate child views.

            var contentDetailList = new Stem.Views.ContentAsFeaturedDetails({
                collection: this.content,
                el: $('#content-details')[0]
            });

            contentDetailList.render();

            var proposalDetailList = new Stem.Views.CompletedProposalsAsFeaturedDetails({
                collection: this.completedProposals,
                el: $('#proposals-details')[0]
            });

            proposalDetailList.render();

        }

    });

})();
