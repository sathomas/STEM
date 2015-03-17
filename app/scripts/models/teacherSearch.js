/*global Stem, _, Backbone*/

// Backbone model that backs the teacher-focused
// search page.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.TeacherSearch = Backbone.Model.extend({

        initialize: function () {

            // When this model is created, all we really
            // do is create the child models that back
            // various components of the teacher-focused
            // search page. Since this parent model isn't
            // dynamic, we can just set properties directly
            // instead of going through Backbone's `set()`
            // and `get()` methods.

            // One model tracks the free-form search query.

            this.searchQuery = new Stem.Models.Search({
                label: 'Search for resources',
                placeholder: 'Search the Georgia STEM Incubator',
                shortPlaceholder: 'Search'
            });

            // If that model changes, we'll want to update
            // the live searches. Because we're tracking user
            // keystrokes, we debounce the udpate to avoid
            // thrashing the server.

            this.listenTo(this.searchQuery, 'change',
                _(this.updateSearch).debounce(250));

            // Next we set up the various tags that users
            // can set to focus the search. Initially, all
            // the tags are selected for the broadest
            // possible search.

            this.tags = {
                primary:    new Stem.Models.Tag({ label: 'K-2',  selected: true }),
                elementary: new Stem.Models.Tag({ label: '3-5',  selected: true }),
                middle:     new Stem.Models.Tag({ label: '6-8',  selected: true }),
                high:       new Stem.Models.Tag({ label: '9-12', selected: true })
            };

            // Create a single collection of all tags to
            // conveniently capture change events.

            this.allTags = new Stem.Collections.Tags(_(this.tags).values());

            // Update the search results whenever the user changes filters.

            this.listenTo(this.allTags,'change', this.updateSearch);

            // Gather the tags into related tag sets.

            this.tagSets = {
                grades: new Stem.Models.TagSet({
                            title: 'Grade level',
                            tags: new Stem.Collections.Tags([
                                this.tags.primary,
                                this.tags.elementary,
                                this.tags.middle,
                                this.tags.high
                            ])
                        })
            };

            // We use the tags as part of the filters
            // that let users focus their search on
            // a specific perspective. Initially the
            // first filter is selected.

            this.filters = {
                content: new Stem.Models.SearchFilter({
                            icon: 'fa-cloud-download',
                            selected: true,
                            tagSet: this.tagSets.grades,
                            title: 'Resources and units'
                        }),
                courses: new Stem.Models.SearchFilter({
                            icon: 'fa-certificate',
                            tagSet: this.tagSets.grades,
                            title: 'Professional learning'
                        }),
                groups: new Stem.Models.SearchFilter({
                            icon: 'fa-comments-o',
                            tagSet: this.tagSets.grades,
                            title: 'People and groups'
                        })
            };

            // Collect all of the filters into a single
            // filter group.

            this.searchFilters = new Stem.Collections.SearchFilters([
                this.filters.content,
                this.filters.courses,
                this.filters.groups
            ]);

            // Create groups to manage the various search results.

            this.searchResults = {
                content: new Stem.Models.SearchGroup({
                            collection: new Stem.Collections.Content([], { limit: 16 } ),
                            heading: 'Resources and units',
                            moreLink: Stem.config.oae.protocol + '//' +
                                      Stem.config.oae.host + '/search/?types=content'
                        }),
                groups:  new Stem.Models.SearchGroup({
                            collection: new Stem.Collections.Groups( [], { limit: 16 } ),
                            heading: 'Groups and people',
                            moreLink: Stem.config.oae.protocol + '//' +
                                      Stem.config.oae.host + '/search/?types=user,group'
                        })
            };

            // Now that everything is set up, perform the initial
            // search query.

            this.updateSearch();

        },

        // Update the search.

        updateSearch: function () {

            // Gather the keywords and terms for the search.
            // Start with whatever the user has typed into
            // the free-form query.

            var keywords = this.searchQuery.get('query');

            // Add special keywords based on the tag
            // settings.

            if (this.tags.primary.get('selected')) {
                keywords += ', k-2, primary, elementary';
            }
            if (this.tags.elementary.get('selected')) {
                keywords += ', 3-5, elementary';
            }
            if (this.tags.middle.get('selected')) {
                keywords += ', 6-8, middle';
            }
            if (this.tags.high.get('selected')) {
                keywords += ', 9-12, high';
            }

            // Update the collections and trigger new
            // fetches.

            _(this.searchResults).each(function(search) {
                search.get('collection').options({keywords: keywords})
                    .fetch({reset: true});
            });

        }

    });

})();
