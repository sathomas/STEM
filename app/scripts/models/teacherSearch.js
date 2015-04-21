/*global Stem, _, Backbone*/

// Backbone model that backs the teacher-focused
// search page.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.TeacherSearch = Backbone.Model.extend({

        setupSearch: function () {

            // If no search query was provided when
            // the model was created, we create our
            // own.

            if (!this.get('searchQuery')) {

                var searchQuery = new Stem.Models.Search({
                    label: 'Search resources',
                    placeholder: 'Search the Incubator'
                });

                this.set('searchQuery',searchQuery);

            }

            // If that model changes, we'll want to update
            // the live searches. Because we're tracking user
            // keystrokes, we debounce the update to avoid
            // hammering the server.

            this.get('searchQuery').on(
                'change',
                _(this.updateResults).debounce(250),
                this
            );

        },

        setupTags: function () {

            // Create a collection of tags for grade levels
            // to augment the search query.

            var gradeLevelTags = new Stem.Collections.Tags([
                new Stem.Models.Tag({ label: 'P-2' }),
                new Stem.Models.Tag({ label: '3-5' }),
                new Stem.Models.Tag({ label: '6-8' }),
                new Stem.Models.Tag({ label: '9-12' })
            ]);

            this.set('gradeLevelTags', gradeLevelTags);

            // Update the search results whenever the user
            // selects or deselects a tag.

            this.listenTo(gradeLevelTags,'change', this.updateResults);

            // Create a tag set from the collection

            this.set('gradeLevelTagSet', new Stem.Models.TagSet({
                title: 'Grade level',
                tags: gradeLevelTags
            }));

        },

        getQueryTags: function () {

            // Create an augmented search query based on the
            // tag settings. Start with an empty query

            var query = '';

            // Look at each tag one at a time.

            this.get('gradeLevelTags').each(function(tag) {

                // If the tag isn't selected, then we can
                // skip it.

                if (tag.get('selected')) {

                    // For selected tags, we use "domain
                    // specific knowledge" to hack the
                    // search query.

                    switch (tag.get('label')) {
                        case 'P-2':
                            query += ', "primary school"' +
                                     ', "elementary school"' +
                                     ', p-2, k-2' +
                                     ', preschool, kindergarten' +
                                     ', "1st grade", "first grade"' +
                                     ', "2nd grade", "second grade"';
                            break;
                        case '3-5':
                            query += ', "primary school"' +
                                     ', "elementary school"' +
                                     ', 3-5, "3rd grade", "third grade"' +
                                     ', "4th grade", "fourth grade"' +
                                     ', "5th grade", "fifth grade"';
                            break;
                        case '6-8':
                            query += ', "secondary school"' +
                                     ', 6-8, "middle school"' +
                                     ', "6th grade", "sixth grade"' +
                                     ', "7th grade", "seventh grade"' +
                                     ', "8th grade", "eighth grade"';
                            break;
                        case '9-12':
                            query += ', "secondary school"' +
                                     ', 9-12, "high school"' +
                                     ', "9th grade", "ninth grade"' +
                                     ', "10th grade", "tenth grade"' +
                                     ', "11th grade", "eleventh grade"' +
                                     ', "12th grade", "twelfth grade"';
                            break;
                    }

                }

            });

            return query;

        },

        setupFacets: function () {

            // There are many facets to a particular
            // search query. Each facet includes a
            // filter (to prioritize that facet) and
            // a collection of results that
            // correspond to it. We allow the facets
            // to be predefined when the model is
            // created to provide maximum flexibility
            // (and ease of unit testing), though,
            // in most cases we'll set them up here.

                if (!this.get('facets')) {

                var facets = {

                    content: {

                        filter: new Stem.Models.SearchFilter({
                            icon: 'fa-cloud-download',
                            selected: true,
                            tagSet: this.get('gradeLevelTagSet'),
                            title: 'Resources and units'
                        }),
                        results: new Stem.Models.SearchGroup({
                            collection: new Stem.Collections.Contents([], {
                                 limit: 16
                            }),
                            heading: 'Resources and units',
                            moreLink: Stem.config.oae.protocol + '//' +
                                      Stem.config.oae.host + '/search/?types=content'
                        })

                    },

                    courses: {

                        filter: new Stem.Models.SearchFilter({
                            icon: 'fa-certificate',
                            title: 'Professional learning'
                        }),
                        results: new Stem.Models.SearchGroup({
                            collection: new Stem.Collections.MemberGroups([], {
                                limit: 16,
                                parentId: Stem.config.oae.groups.courses
                            }),
                            heading: 'Professional Learning',
                            moreLink: Stem.config.oae.protocol + '//' +
                                      Stem.config.oae.host + '/group/si/m179WbZq/members'
                        })

                    },

                    groups: {

                        filter: new Stem.Models.SearchFilter({
                            icon: 'fa-comments-o',
                            title: 'Groups and organizations'
                        }),
                        results:  new Stem.Models.SearchGroup({
                            collection: new Stem.Collections.Principals([], {
                                limit: 16
                            }),
                            heading: 'Groups and organizations',
                            moreLink: Stem.config.oae.protocol + '//' +
                                      Stem.config.oae.host + '/search/?types=user,group'
                        })

                    }

                };

                this.set('facets', facets);

            }

            // Create a filters collection to hold all of the
            // facet filters.

            this.set('searchFilters',
                new Stem.Collections.SearchFilters()
            );

            // Add each filter to that collection. While we're
            // iterating thought the filters, pick out the
            // particular facet that is initially selected.

            _(this.get('facets')).each(function(facet, key) {

                if (facet.filter) {

                    this.get('searchFilters').add(facet.filter);

                    if (facet.filter.get('selected')) {

                        this.set('facet', key);

                    }

                }

            }, this);

            // Watch for any changes to the filters.

            this.get('searchFilters').on('change', this.filterChanged, this);

            // Also watch for any parent object changing the facet.

            this.on('change:facet', this.updateFacet, this);

        },

        initialize: function () {

            // Set up the individual components of the
            // model.

            this.setupSearch();
            this.setupTags();
            this.setupFacets();

            // Now that everything is set up, perform
            // the initial search query.

            this.updateResults();

        },

        updateFacet: function () {

            // Somebody updated the search facet. Figure
            // out which one they want by looking for a
            // match within our facets object.

            _(this.get('facets')).each(function(facet, key) {

                // If we find a match, set the filter to
                // be selected.

                if ((this.get('facet') === key) && facet.filter) {
                    facet.filter.set('selected',true);
                }

            }, this);

        },

        updateResults: function () {

            // Gather the keywords and terms for the search.
            // Start with whatever the user has typed into
            // the free-form query and augment that input
            // with tag-based additions.

            var keywords = this.get('searchQuery').get('query'),
                extendedKeywords = keywords + this.getQueryTags();

            // Update the collections and trigger new
            // fetches.

            _(this.get('facets')).each(function(facet, key) {

                // Make sure there's a results model to
                // update.

                if (facet.results) {

                    // If we do have a results model,
                    // change the options on it's collection
                    // to match the new search query. If
                    // the facet is `content`, then use
                    // the extended keywords that include
                    // tags. Otherwise, just use the basic
                    // keywords.
                    //
                    // After updating the options, trigger
                    // a fetch on the collection to get
                    // new results.

                    facet.results.get('collection').options({
                        keywords: key === 'content' ?
                            extendedKeywords : keywords
                    }).fetch({reset: true, validate: true});

                }

            }, this);

            // We also want to update the "More" links
            // associated with each search results. First
            // figure out a URL to use.

            var oaeUrl = Stem.config.oae.protocol + '//' +
                         Stem.config.oae.host + '/search/' +
                         encodeURIComponent(keywords) + '?types=',
                extendedUrl = Stem.config.oae.protocol + '//' +
                         Stem.config.oae.host + '/search/' +
                         encodeURIComponent(extendedKeywords) + '?types=';

            // Now update the model with the new URLs.

            this.get('facets').content.results.set('moreLink', extendedUrl + 'content');
            this.get('facets').groups.results.set('moreLink', oaeUrl + 'user,group');

            // Update the hash in the browser's address bar

            this.updateHash();

        },

        filterChanged: function (filter) {

            // Most of the time, when one filter
            // changes, all the others will as
            // well. We only care about the filter
            // that's now selected.

            if (filter.get('selected')) {

                // Find the specific filter in our
                // set so that we can update the
                // facet attribute.

                _(this.get('facets')).each(function(facet, key) {

                    if (facet.filter === filter) {
                        this.set('facet',key);
                    }

                }, this);

                // Update the browser's address bar

                this.updateHash();
            }

        },

        updateHash: function () {

            // Let folks upstream know when the URL hash
            // can be changed.

            // Start by extracting the query.

            var query = encodeURIComponent(
                this.get('searchQuery').get('query')
            );

            // Add the appropriate facet.

            _(this.get('facets')).each(function(facet, key) {

                if ((facet.filter) && (facet.filter.get('selected'))) {
                    query += '/' + key;
                }

            }, this);

            this.trigger('navigate', query);

        }

    });

})();
