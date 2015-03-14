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

            // Create separate views for both of the search forms
            // and insert them into the page.

            this.discoverySearch = new Stem.Views.SearchForm({
                model: this.searchQuery,
                theme: 'theme-1'
            });

            this.mainSearch = new Stem.Views.SearchForm({
                model: this.searchQuery,
                showLabel: false,
                theme: 'theme-1'
            });

            $('#teachers-discovery-search-form')
                .replaceWith(this.discoverySearch.render().$el);

            $('#teachers-search-form')
                .replaceWith(this.mainSearch.render().$el);


            // Return view for method chaining.

            return this;

        }

    });

})();
