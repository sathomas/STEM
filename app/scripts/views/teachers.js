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

        // ## filters
        //
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
        
        // ## filterModel()
        //
        // Utility function to check a model against a set
        // of filters. Grade level filtering is assumed; 
        // an optional tag array can also be supplied.
        
        filterModel: function(model, tags) {
            
            var gradeFilters = this.gradeTagSet.getSelectedTags();
                        
            // The grade level matches if either:
            // - there are no grade level filters defined, or
            // - at least one of the grade level filters matches
            //   at least one of the content grade levels

            var gradeOk = (gradeFilters.length === 0) ||
                (model.get('primary') &&
                _(gradeFilters).indexOf('K-2')  !== -1) ||
                (model.get('elementary') &&
                _(gradeFilters).indexOf('3-5')  !== -1) ||
                (model.get('middle')     &&
                _(gradeFilters).indexOf('6-8')  !== -1) ||
                (model.get('high')       &&
                _(gradeFilters).indexOf('9-12') !== -1);


            // The tags match if either:
            // - there are no tag filters defined, or
            // - at least one of the tags in the model
            //   matches at least one of the tags in the
            //   filter.

            var tagsOk = (!_.isArray(tags)) || (tags.length === 0) ||
                _(model.get('tags')).any(function(tag) {
                    return tags.indexOf(tag) !== -1;
                });

            return gradeOk && tagsOk;

        },
        
        // ## setupContent()
        //
        // Set up the models and collections for content.
        
        setupContent: function() {
            
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

        },
        
        // ## updateContentTags()
        //
        // Update the list of valid tags for content whenever
        // the content collection itself changes.

        updateContentTags: function() {

            // Reset the content tags collection with
            // an updated array of models.

            this.contentTags.reset(

                // Create models from the tag now
                // available in the content collection.
                // Initially no tags are selected.

                this.content.getTags().map(function(tag) {
                    return new Stem.Models.Tag({
                        'selected': false,
                        'label': tag
                    });
                })

            );

        },

        // ## updateContentFilters()
        //
        // Update the content filters whenever a user makes a
        // change to the selection.

        updateContentFilters: function() {

            this.filters.content.tags = this.contentTagSet.getSelectedTags();
            this.filteredContent.refilter();

        },

        // ## setupGroups
        //
        // Set up the models and collections for groups.
        
        setupGroups: function() {
            
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

        },
        
        // ## updateGroupTags()
        //
        // Update the list of valid tags for groups whenever
        // the group collection itself changes.

        updateGroupTags: function() {

            // Reset the content tags collection with
            // an updated array of models.

            this.groupTags.reset(

                // Create models from the tags now
                // available in the groups collection.
                // Initially no tags are selected.

                this.groups.getTags().map(function(tag) {
                    return new Stem.Models.Tag({
                        'selected': false,
                        'label':  tag
                    });
                })

            );

        },

        // ## updateGroupFilters()
        //
        // Update the group filters whenever a user makes a
        // change to the selection.

        updateGroupFilters: function() {

            this.filters.group.tags = this.groupTagSet.getSelectedTags();
            this.filteredGroups.refilter();

        },

        // ## setupProposals
        //
        // Set up the models and collections for proposals.
        
        setupProposals: function() {

            // Create the collection of completed proposals.

            this.completedProposals = new Stem.Collections.Proposals([], {
                historical: true,
                maxSize:    5
            });

            // Retrieve the data from DonorsChoose.

            this.completedProposals.fetch();

        },
        
        // ## setupGradeLevels
        //
        // Set up the models and collections for managing grade levels.
        
        setupGradeLevels: function() {

            // Create a model to store the grade level. For
            // maximum flexibility we allow no grade levels
            // and multiple grade levels. We implement this
            // as a tag set.
            
            // Create a collection of tags for content.

            this.gradeTags = new Stem.Collections.Tags([
                new Stem.Models.Tag({
                    'selected': false,
                    'label': 'K-2'
                }),
                new Stem.Models.Tag({
                    'selected': false,
                    'label': '3-5'
                }),
                new Stem.Models.Tag({
                    'selected': false,
                    'label': '6-8'
                }),
                new Stem.Models.Tag({
                    'selected': false,
                    'label': '9-12'
                })
            ]);
            
            // And create a model for the set of content tags.
            
            this.gradeTagSet = new Stem.Models.TagSet({
                tags: this.gradeTags,
                title: 'Grade level'
            });
            
            // Update the tag filters whenever the user changes grades.

            this.gradeTags.on('change', this.updateContentFilters, this)
                          .on('change', this.updateGroupFilters, this);

        },
        
        // ## initialize()
        //
        // Initialize the view.

        initialize: function () {

            var view = this;
            
            // Kick off the initialization process by
            // requesting data from the various
            // collections that will be a part of the
            // view.
            
            this.setupContent();
            this.setupGroups();
            this.setupProposals();


            // Now that we've started gathering the data
            // for the view, we can set up the high-level
            // user interactions.
            
            this.setupGradeLevels();

            // Create a filtered content collection to reflect
            // the user's selections.

            this.filteredContent = new FilteredCollection(this.content);
            this.filteredContent.filterBy(function(model) {
                return view.filterModel(model, view.filters.content.tags);
            });

            // Create a filtered groups collection to reflect
            // the user's selections.

            this.filteredGroups = new FilteredCollection(this.groups);
            this.filteredGroups.filterBy(function(model) {
                return view.filterModel(model, view.filters.group.tags);
            });

        },

        render: function () {

            // Rendering this view is really nothing
            // much more than creating and rendering
            // the appropriate child views. We do perform
            // a small bit of trickery with the first
            // view by overriding the main label. Normally
            // the view gets this value from the model,
            // and since we're showing the same model in
            // many views, we don't want to change the
            // model's value.
            
            new Stem.Views.TagSetAsHorizontalSelection({
                el: $('#grade-selection')[0],
                model: this.gradeTagSet
            }).render().$el.
                find('label.horizontal-selection__label').
                text('I teach:');

            new Stem.Views.TagSetAsVerticalSelection({
                el: $('#content-tags')[0],
                model: this.contentTagSet
            }).render();

            new Stem.Views.TagSetAsVerticalSelection({
                el: $('#content-grades')[0],
                model: this.gradeTagSet
            }).render();

            new Stem.Views.ContentAsFeaturedDetails({
                collection: this.filteredContent,
                el: $('#content-details')[0]
            }).render();

            new Stem.Views.TagSetAsVerticalSelection({
                el: $('#group-tags')[0],
                model: this.groupTagSet
            }).render();

            new Stem.Views.TagSetAsVerticalSelection({
                el: $('#group-grades')[0],
                model: this.gradeTagSet
            }).render();

            new Stem.Views.GroupsAsFeaturedDetails({
                collection: this.filteredGroups,
                el: $('#group-details')[0]
            }).render();

            new Stem.Views.CompletedProposalsAsFeaturedDetails({
                collection: this.completedProposals,
                el: $('#proposals-details')[0]
            }).render();

        }

    });

})();
