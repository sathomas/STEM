/* global Stem, _, Backbone, JST */

// Backbone view for the teacher-focused
// search page of the application.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TeacherSearchAsPage = Backbone.View.extend({

        // Markup stored as external template.

        template: JST['app/scripts/templates/teacherSearchAsPage.ejs'],

        // First level element is a `<section>`.

        tagName: 'section',

        // The 'id' is used for navigation.

        id: 'teachers-search',

        // ## renderSearchBar
        //
        // Render the search bar that supports
        // teacher-focused search queries.

        renderSearchBar: function () {

            var model = this.model.searchQuery;

            // Create separate views for both of the search forms
            // and insert them into the page.

            this.searchBar = new Stem.Views.SearchAsForm({
                model: model,
                showLabel: false,
                theme: 'theme-1'
            });

            this.$el.find('.search')
                .append(this.searchBar.render().$el);

       },

        // ## renderSearchFilters
        //
        // Show the search filters on the page.

        renderSearchFilters: function () {

            this.searchFiltersList = this.searchFiltersList ||
                new Stem.Views.SearchFiltersAsList({
                    collection: this.model.searchFilters
                });

            this.searchFiltersList.render();

            this.$el.find('.results-filter').append(this.searchFiltersList.$el);

            // If the filters change, update the search
            // presentation. Because changing one radio
            // button (selecting it) necessarily changes
            // another one (whatever was previously selected),
            // we debounce this event.

            this.listenTo(this.model.searchFilters,'change', _(this.arrangeResults).debounce(16));

        },

        // ## renderResults
        //
        // Create markup for the search results.

        renderResults: function () {

            this.contentMainView = this.contentMainView ||
                new Stem.Views.OaeAsMainSearchGroup({
                    model: this.model.searchResults.content
                });

            this.contentSecondaryView = this.contentSecondaryView ||
                new Stem.Views.OaeAsSecondarySearchGroup({
                    model: this.model.searchResults.content
                });

            this.groupsMainView = this.groupsMainView ||
                new Stem.Views.OaeAsMainSearchGroup({
                    model: this.model.searchResults.groups
                });

            this.groupsSecondaryView = this.groupsSecondaryView ||
                new Stem.Views.OaeAsSecondarySearchGroup({
                    model: this.model.searchResults.groups
                });

            this.contentMainView.render();
            this.contentSecondaryView.render();
            this.groupsMainView.render();
            this.groupsSecondaryView.render();

            this.arrangeResults();

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

            if (this.model.filters.content.get('selected')) {

                this.$el.find('.results-main')
                    .append(this.contentMainView.$el);
                this.$el.find('.results-secondary')
                    .append(this.groupsSecondaryView.$el);

            } else if (this.model.filters.courses.get('selected')) {

                this.$el.find('.results-secondary')
                    .append(this.groupsSecondaryView.$el)
                    .append(this.contentSecondaryView.$el);

            } else if (this.model.filters.groups.get('selected')) {

                this.$el.find('.results-main')
                    .append(this.groupsMainView.$el);
                this.$el.find('.results-secondary')
                    .append(this.contentSecondaryView.$el);

            }

        },

        // ## render

        render: function () {

            // Render the main template first.

            this.$el.html(this.template());

            // Add in ARIA information.

            var headingId = _.uniqueId();
            this.$el.attr('aria-labelledby', headingId);
            this.$el.find('h2').attr('id', headingId);

            // Render the individual components of the view.

            this.renderSearchBar();
            this.renderSearchFilters();
            this.renderResults();

            // Return view for method chaining.

            return this;  // for method chaining

        }

    });

})();
