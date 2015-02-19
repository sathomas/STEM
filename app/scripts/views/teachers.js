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
        // (almost) everywhere, and there are tag-level
        // filters that apply separately to content and to
        // groups.

        filters: {
            grade: [],
            content: {
                tags: []
            },
            group: {
                tags: []
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

            // -------------- Content --------------

            // Create a collection of content objects

            this.content = new Stem.Collections.Content([], {
                limit: 99
            });

            // Create a collection of tags for content.

            this.contentTags = new Stem.Collections.Tags();
            
            // And create a model for the set of content tags.
            
            this.contentTagSet = new Stem.Models.TagSet({
                tags: this.contentTags,
                title: 'Subjects'
            });

            // Update the tags whenever the underlying
            // collection changes.

            this.content.on('sync reset', this.updateContentTags, this);

            // Update the tag filters whenever the user changes one.

            this.contentTags.on('change', this.updateContentFilters, this);

            // Populate the collections with content from the OAE.

            this.content.fetch();

            // -------------- Groups --------------

            // Create a collection of group objects

            this.groups = new Stem.Collections.Groups([], {
                limit: 99
            });

            // Create a collection of tags for groups

            this.groupTags = new Stem.Collections.Tags();

            // And create a model for the set of group tags.
            
            this.groupTagSet = new Stem.Models.TagSet({
                tags: this.groupTags,
                title: 'Topics'
            });

            // Update the tags whenever the underlying
            // collection changes.

            this.groups.on('sync reset', this.updateGroupTags, this);

            // Update the tag filters whenever the user changes one.

            this.groupTags.on('change', this.updateGroupFilters, this);

            // Populate the collections with content from the OAE.

            this.groups.fetch();

            // -------------- Proposals --------------

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

            // Create a filtered content collection to reflect
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

                // The tags match if either:
                // - there are no tag filters defined, or
                // - at least one of the tags in the model
                //   matches at least one of the tags in the
                //   filter.

                var tagsOk = (view.filters.content.tags.length === 0) ||
                    _(model.get('tags')).any(function(tag) {
                        return view.filters.content.tags.indexOf(tag) !== -1;
                    });

                return gradeOk && tagsOk;
            });

            // Create a filtered groups collection to reflect
            // the user's selections.

            this.filteredGroups = new FilteredCollection(this.groups);
            this.filteredGroups.filterBy(function(model) {

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

                // The tags match if either:
                // - there are no tag filters defined, or
                // - at least one of the subjecs in the model
                //   matches at least one of the tags in the
                //   filter.

                var tagsOk = (view.filters.group.tags.length === 0) ||
                    _(model.get('tags')).any(function(tag) {
                        return view.filters.group.tags.indexOf(tag) !== -1;
                    });

                return gradeOk && tagsOk;
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
                view.filteredGroups.refilter();

            });

        },

        // Define a function to update the list of valid
        // tags for content whenever the content
        // collection itself changes.

        updateContentTags: function() {

            // Reset the content tags collection with
            // an updated array of models.

            this.contentTags.reset(

                // Create models from the tag now
                // available in the content collection.
                // We need to explicitly give each tag a
                // unique identifier since we're not
                // getting these values from a server.
                // Initially no tags are selected.

                this.content.getTags().map(function(tag) {
                    return new Stem.Models.Tag({
                        'id': _.uniqueId('content_tag_'),
                        'selected': false,
                        'label': tag
                    });
                })

            );

        },

        // Define a function to update the list of valid
        // tags for groups whenever the gropus
        // collection itself changes.

        updateGroupTags: function() {

            // Reset the content tags collection with
            // an updated array of models.

            this.groupTags.reset(

                // Create models from the tags now
                // available in the groups collection.
                // We need to explicitly give each tag a
                // unique identifier since we're not
                // getting these values from a server.
                // Initially no tags are selected.

                this.groups.getTags().map(function(tag) {
                    return new Stem.Models.Tag({
                        'id':       _.uniqueId('group_tag_'),
                        'selected': false,
                        'label':  tag
                    });
                })

            );

        },

        // Update the content filters whenever a user makes a
        // change to the selection.

        updateContentFilters: function() {

            this.filters.content.tags = this.contentTagSet.getSelectedTags();
            this.filteredContent.refilter();

        },

        // Update the group filters whenever a user makes a
        // change to the selection.

        updateGroupFilters: function(selected) {

            this.filters.group.tags = this.groupTagSet.getSelectedTags();;
            this.filteredGroups.refilter();

        },

        render: function () {

            // Rendering this view is really nothing
            // much more than creating and rendering
            // the appropriate child views.

            var contentTagSetView = new Stem.Views.TagSetAsVerticalSelection({
                el: $('#content-tags')[0],
                model: this.contentTagSet
            });

            contentTagSetView.render();

            var contentDetailView = new Stem.Views.ContentAsFeaturedDetails({
                collection: this.filteredContent,
                el: $('#content-details')[0]
            });

            contentDetailView.render();

            var groupTagtSetView = new Stem.Views.TagSetAsVerticalSelection({
                el: $('#group-tags')[0],
                model: this.groupTagSet
            });

            groupTagtSetView.render();

            var groupDetailView = new Stem.Views.GroupsAsFeaturedDetails({
                collection: this.filteredGroups,
                el: $('#group-details')[0]
            });

            groupDetailView.render();

            var proposalDetailView = new Stem.Views.CompletedProposalsAsFeaturedDetails({
                collection: this.completedProposals,
                el: $('#proposals-details')[0]
            });

            proposalDetailView.render();

        }

    });

})();
