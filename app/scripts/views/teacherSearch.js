/* global Stem, $ */

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

        // ## renderGradeLevels
        //
        // Render the grade-level filters that support
        // teacher-focused search queries.

        renderGradeLevels: function () {

            var view = this;

            // Insert a grade-level filter in each filter set.

            $('#teachers-results-filter .results-filter__list-item__content').each(function() {

                var checkboxGroup = new Stem.Views.TagSetAsCheckboxGroup({
                    model: view.gradeTagSet
                });

                checkboxGroup.render();

                $(this).append(checkboxGroup.$el);

            });

        },

        // ## setupCollections
        //
        // Setup the collections that will manage the
        // search results.

        setupCollections: function () {

            this.content = new Stem.Collections.Content([],{limit: 16});
            this.groups  = new Stem.Collections.Groups( [],{limit: 16});

        },

        // ## renderCollections
        //
        // Show the search results on the page.

        renderCollections: function () {

            this.contentMainView = this.contentMainView ||
                new Stem.Views.OaeAsMainSearchResults({
                    collection: this.content,
                    el: $('#teacher-search-results-main-list').get(0)
                });

            this.contentMainView.render();

        },

        // ## initialize

        initialize: function () {

            // Initialize the individual components

            this.setupSearchBars();
            this.setupGradeLevels();
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
            this.renderGradeLevels();
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
