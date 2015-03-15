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

        initialize: function () {

            // Create a model to coordinate search queries.

            this.searchQuery = new Stem.Models.Search({
                label: 'Search for resources',
                placeholder: 'Search the Georgia STEM Incubator',
                shortPlaceholder: 'Search'
            });

            // Return view for method chaining.

            return this;

        },

        render: function () {

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


            // Return view for method chaining.

            return this;

        },

        // Custom method to set the search query.

        setQuery: function (query) {

            this.searchQuery.set('query', query);

        }

    });

})();
