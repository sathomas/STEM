/* global Stem, $, _, Backbone */

// Backbone view for the teacher-focused
// search page of the application. This view is
// a parent view for various components
// and does not have an associated model
// or collection.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TeacherSearch = Backbone.View.extend({

        // ## setupSearchBars
        //
        // Set up the models and collections for managing search bars.

        setupSearchBars: function() {

            // Create a model to coordinate search queries.

            this.searchQuery = new Stem.Models.Search({
                label: 'Search for resources',
                placeholder: 'Search the Georgia STEM Incubator',
                shortPlaceholder: 'Search'
            });

            // Dynamically update search results as
            // user types input.

            this.listenTo(this.searchQuery, 'change', _(this.search).debounce(250));

        },

        // ## renderSearchBars
        //
        // Render the search bar(s) that support
        // teacher-focused search queries.

        renderSearchBars: function () {

            var model = this.searchQuery,
                view = this;

            // Create separate views for both of the search forms
            // and insert them into the page.

            this.discoverySearch = new Stem.Views.SearchForm({
                model: model,
                theme: 'theme-1'
            });

            this.mainSearch = new Stem.Views.SearchForm({
                model: model,
                showLabel: false,
                theme: 'theme-1'
            });

            $('#teachers-discovery-search-form')
                .replaceWith(this.discoverySearch.render().$el);

            $('#teachers-search-form')
                .replaceWith(this.mainSearch.render().$el);

            // If the discovery search form is submitted,
            // navigate to the full search page.

            this.discoverySearch.on('submit', function() {
                view.trigger('search', model.get('query'));
            });

       },

        // ## setupGradeLevels
        //
        // Set up the models and collections for managing grade levels.

        setupGradeLevels: function() {

            // Create a model to store the grade level. For
            // maximum flexibility we allow no grade levels
            // and multiple grade levels. We implement this
            // as a tag set.

            // Create a collection of tags for grade levels.

            this.primarySchool =    new Stem.Models.Tag({ label: 'K-2',  selected: true });
            this.elementarySchool = new Stem.Models.Tag({ label: '3-5',  selected: true });
            this.middleSchool =     new Stem.Models.Tag({ label: '6-8',  selected: true });
            this.highSchool =       new Stem.Models.Tag({ label: '9-12', selected: true });

            this.gradeTags = new Stem.Collections.Tags([
                this.primarySchool,
                this.elementarySchool,
                this.middleSchool,
                this.highSchool
            ]);

            // And create a model for the set of content tags.

            this.gradeTagSet = new Stem.Models.TagSet({
                tags: this.gradeTags,
                title: 'Grade level'
            });

            // Update the tag filters whenever the user changes grades.

            this.listenTo(this.gradeTags,'change', this.search);

        },

        // ## setupSearchFilters
        //
        // Setup the filters that will control the search
        // results presentation.

        setupSearchFilters: function () {

            // Grade levels are part of the filters.

            this.setupGradeLevels();

            // Create models for the individual filters.

            this.showContent = new Stem.Models.SearchFilter({
                icon: 'fa-cloud-download',
                selected: true,
                tagSet: this.gradeTagSet,
                title: 'Resources and units'
            });
            this.showCourses = new Stem.Models.SearchFilter({
                icon: 'fa-certificate',
                tagSet: this.gradeTagSet,
                title: 'Professional learning'
            });
            this.showGroups = new Stem.Models.SearchFilter({
                icon: 'fa-comments-o',
                tagSet: this.gradeTagSet,
                title: 'People and groups'
            });

            // Collect the models into a collection.

            this.searchFilters = new Stem.Collections.SearchFilters([
                this.showContent,
                this.showCourses,
                this.showGroups
            ]);

            // If the filters change, update the search
            // presentation.

            this.listenTo(this.searchFilters,'change', this.arrangeResults);

        },

        // ## renderSearchFilters
        //
        // Show the search filters on the page.

        renderSearchFilters: function () {

            this.searchFiltersList = this.searchFiltersList ||
                new Stem.Views.SearchFiltersAsList({
                    collection: this.searchFilters
                });

            this.searchFiltersList.render();

            $('#teachers-results-filter').append(this.searchFiltersList.$el);

        },

        // ## setupCollections
        //
        // Setup the collections that will manage the
        // search results.

        setupCollections: function () {

            this.content = new Stem.Collections.Content([],{limit: 16});
            this.groups  = new Stem.Collections.Groups( [],{limit: 16});

            this.contentGroup = new Stem.Models.SearchGroup({
                collection: this.content,
                heading: 'Resources and units',
                moreLink: Stem.config.oae.protocol + '//' +
                          Stem.config.oae.host + '/search/?types=content'
            });
            this.groupsGroup = new Stem.Models.SearchGroup({
                collection: this.groups,
                heading: 'Groups and people',
                moreLink: Stem.config.oae.protocol + '//' +
                          Stem.config.oae.host + '/search/?types=user,group'
            });

        },

        // ## arrangeResults
        //
        // Arrange the search results on the page.

        arrangeResults: function () {

            // First detach existing elements from the DOM.

            this.contentMainView.$el.detach();
            this.contentSecondaryView.$el.detach();
            this.groupsMainView.$el.detach();
            this.groupsSecondaryView.$el.detach();

            // Insert the elements in the correct locations
            // depending on which filter is selected.

            if (this.showContent.get('selected')) {

                $('#teacher-search-results-main')
                    .append(this.contentMainView.$el);
                $('#teacher-search-results-secondary')
                    .append(this.groupsSecondaryView.$el);

            } else if (this.showCourses.get('selected')) {

                $('#teacher-search-results-secondary')
                    .append(this.groupsSecondaryView.$el);
                $('#teacher-search-results-secondary')
                    .append(this.contentSecondaryView.$el);

            } else if (this.showGroups.get('selected')) {

                $('#teacher-search-results-main')
                    .append(this.groupsMainView.$el);
                $('#teacher-search-results-secondary')
                    .append(this.contentSecondaryView.$el);

            }

        },

        // ## renderCollections
        //
        // Create markup for the search results.

        renderCollections: function () {

            this.contentMainView = this.contentMainView ||
                new Stem.Views.OaeAsMainSearchGroup({
                    model: this.contentGroup
                });

            this.contentSecondaryView = this.contentSecondaryView ||
                new Stem.Views.OaeAsSecondarySearchGroup({
                    model: this.contentGroup
                });

            this.groupsMainView = this.groupsMainView ||
                new Stem.Views.OaeAsMainSearchGroup({
                    model: this.groupsGroup
                });

            this.groupsSecondaryView = this.groupsSecondaryView ||
                new Stem.Views.OaeAsSecondarySearchGroup({
                    model: this.groupsGroup
                });

            this.contentMainView.render();
            this.contentSecondaryView.render();
            this.groupsMainView.render();
            this.groupsSecondaryView.render();

            this.arrangeResults();

        },

        // ## initialize

        initialize: function () {

            // Initialize the individual components

            this.setupSearchBars();
            this.setupSearchFilters();
            this.setupCollections();

            // Kick off the first search

            this.search();

            // Return view for method chaining.

            return this;

        },

        // ## render

        render: function () {

            // Render the individual components of the view.

            this.renderSearchBars();
            this.renderSearchFilters();
            this.renderCollections();

            // Return view for method chaining.

            return this;

        },

        // ## search

        search: function() {

            // Gather the keywords and terms for the search

            var keywords = this.searchQuery.get('query');

            if (this.primarySchool.get('selected')) {
                keywords += ', k-2, primary, elementary';
            }

            if (this.elementarySchool.get('selected')) {
                keywords += ', 3-5, primary, elementary';
            }

            if (this.middleSchool.get('selected')) {
                keywords += ', 6-8, middle';
            }

            if (this.highSchool.get('selected')) {
                keywords += ', 9-12, high';
            }

            // Update the collections and trigger new
            // fetches.

            this.content.options({keywords: keywords})
                .fetch({reset: true});
            this.groups.options({keywords: keywords})
                .fetch({reset: true});

        },

        // ## setQuery
        //
        // Custom method to set the search query.

        setQuery: function (query) {

            this.searchQuery.set('query', query);

        }

    });

})();
