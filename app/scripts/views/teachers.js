/* global Stem, $, _, Backbone, FilteredCollection */

// Backbone view for the teacher-focused
// page of the application. This view is
// a parent view for various components
// and does not have an associated model
// or collection.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.Teachers = Backbone.View.extend({

        // We use an object to keep track of the current
        // state of filtering for teachers details. There
        // is a general filter for grade level that applies
        // (almost) everywhere, and there are subject-level
        // filters that apply separately to content and to
        // groups.

        filters: {
            grade: [],
            content: {
                subject: []
            },
            group: {
                subject: []
            }
        },

        initialize: function () {

            // Store a reference to this view in a local variable to
            // create a closure for anonymous callbacks.

            var view = this;

            // Kick off the initialization process by
            // requesting data from the various
            // collections that will be a part of the
            // view.

            // Create a collection of content objects

            this.content = new Stem.Collections.Content([], {
                limit: 99
            });

            // Create a collection of subjects for content

            this.contentSubjects = new Stem.Collections.Subjects();

            // Update the subjects whenever the underlying
            // collection changes.

            this.content.on('sync reset', this.updateContentSubjects, this);

            // Populate the collections with content from the OAE.

            this.content.fetch();

            // Create the collection of completed proposals.

            this.completedProposals = new Stem.Collections.Proposals([], {
                historical: true,
                maxSize:    5
            });

            // Retrieve the data from DonorsChoose.

            this.completedProposals.fetch();

            // Now that we've started gathering the data
            // for the view, we can set up the high-level
            // user interactions.

            // Create a filtered collection to reflect
            // the user's selections.

            this.filteredContent = new FilteredCollection(this.content);
            this.filteredContent.filterBy(function(model) {

                // The grade level matches if either:
                // - there are no grade level filters defined, or
                // - at least one of the grade level filters matches
                //   at least one of the content grade levels

                var gradeOk = (view.filters.grade.length === 0) ||
                    (model.get('elementary') &&
                    _(view.filters.grade).indexOf('elementary') !== -1) ||
                    (model.get('middle')     &&
                    _(view.filters.grade).indexOf('middle')     !== -1) ||
                    (model.get('high')       &&
                    _(view.filters.grade).indexOf('high')       !== -1);

                // The subject matches if either:
                // - there are no subject filters defined, or
                // - there are no subjects in the model, or
                // - at least one of the subjects in the model
                //   matches at least one of the sujects in the
                //   filter.

                var subjectOk = (view.filters.content.subject.length === 0) ||
                    (model.get('subjects').length === 0) ||
                    _(model.get('subjects')).any(function(subject) {
                        return view.filters.content.subject.indexOf(subject) !== -1;
                    });

                return gradeOk && subjectOk;
            });

            // Listen for user interactions that change the filtering
            // conditions.

            $('input', '#grade-selection').on('change', function() {

                // When something changes in the grade selection,
                // reset the corresponding filters.

                view.filters.grade = [];
                if ($('#cb-elementary').is(':checked')) {
                    view.filters.grade.push('elementary');
                }
                if ($('#cb-middle').is(':checked')) {
                    view.filters.grade.push('middle');
                }
                if ($('#cb-high').is(':checked')) {
                    view.filters.grade.push('high');
                }

                // Trigger the filtered collections to refresh. This
                // will trigger `reset` events on the collections,
                // which the views can use to re-render.

                view.filteredContent.refilter();

            });

        },

        // Define a function to update the list of valid
        // subjects for content whenever the content
        // collection itself changes.

        updateContentSubjects: function() {

            // Reset the content subjects collection with
            // an updated array of models.

            this.contentSubjects.reset(

                // Create models from the subjects now
                // available in the content collection.
                // We need to explicitly give each subject a
                // unique identifier since we're not
                // getting these values from a server.

                this.content.getSubjects().map(function(subject) {
                    return new Stem.Models.Subject({
                        'id':      _.uniqueId('subject_'),
                        'subject': subject
                    });
                })

            );

        },

        render: function () {

            // Rendering this view is really nothing
            // much more than creating and rendering
            // the appropriate child views.

            var contentSubjectList = new Stem.Views.SubjectsAsSelection({
                collection: this.contentSubjects,
                el: $('#content-subjects')[0]
            });

            contentSubjectList.render();

            var contentDetailList = new Stem.Views.ContentAsFeaturedDetails({
                collection: this.filteredContent,
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
