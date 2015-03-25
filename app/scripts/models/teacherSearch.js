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
                primary:    new Stem.Models.Tag({ label: 'P-2',  selected: true }),
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
                            title: 'Professional learning'
                        }),
                groups: new Stem.Models.SearchFilter({
                            icon: 'fa-comments-o',
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
                courses: new Stem.Models.SearchGroup({
                            collection: new Stem.Collections.MemberGroups( [], {
                                limit: 16,
                                parentId: Stem.config.oae.groups.courses
                            } ),
                            heading: 'Professional Learning',
                            moreLink: Stem.config.oae.protocol + '//' +
                                      Stem.config.oae.host + '/group/si/m179WbZq/members'
                        }),
                groups:  new Stem.Models.SearchGroup({
                            collection: new Stem.Collections.Principals( [], { limit: 16 } ),
                            heading: 'People and Groups',
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

            var keywords = this.searchQuery.get('query'),
                extendedKeywords = keywords;

            // Add special keywords based on the tag
            // settings.

            if (this.tags.primary.get('selected') ||
                this.tags.elementary.get('selected')) {
                extendedKeywords += ', "primary school", "elementary school"';
            }
            if (this.tags.primary.get('selected')) {
                extendedKeywords += ', p-2, k-2, ' +
                            'preschool, kindergarten' +
                            ', "1st grade", "first grade"' +
                            ', "2nd grade", "second grade"';
            }
            if (this.tags.elementary.get('selected')) {
                extendedKeywords += ', 3-5, "3rd grade", "third grade"' +
                            ', "4th grade", "fourth grade"' +
                            ', "5th grade", "fifth grade"';
            }
            if (this.tags.middle.get('selected') ||
                this.tags.high.get('selected')) {
                extendedKeywords += ', "secondary school"';
            }
            if (this.tags.middle.get('selected')) {
                extendedKeywords += ', 6-8, "middle school"' +
                            ', "6th grade", "sixth grade"' +
                            ', "7th grade", "seventh grade"' +
                            ', "8th grade", "eighth grade"';
            }
            if (this.tags.high.get('selected')) {
                extendedKeywords += ', 9-12, "high school"' +
                            ', "9th grade", "ninth grade"' +
                            ', "10th grade", "tenth grade"' +
                            ', "11th grade", "eleventh grade"' +
                            ', "12th grade", "twelfth grade"';
            }

            // Update the collections and trigger new
            // fetches.

            _(this.searchResults).each(function(search, key) {
                search.get('collection').options({
                    keywords: key === 'content' ? extendedKeywords : keywords
                }).fetch({reset: true, validate: true});
            });

            // Update the "More" links in the results.

            var oaeUrl = Stem.config.oae.protocol + '//' +
                         Stem.config.oae.host + '/search/' +
                         encodeURIComponent(keywords) + '?types=',
                extendedUrl = Stem.config.oae.protocol + '//' +
                         Stem.config.oae.host + '/search/' +
                         encodeURIComponent(extendedKeywords) + '?types=';
            this.searchResults.content.set('moreLink', extendedUrl + 'content');
            this.searchResults.groups.set('moreLink', oaeUrl + 'user,group');

        }

    });

})();
