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

        // ## rendersearchForm
        //
        // Render the search bar that supports
        // teacher-focused search queries.

        rendersearchForm: function () {

            if (this.model.get('searchQuery')) {

                this.searchForm = new Stem.Views.SearchAsForm({
                    model: this.model.get('searchQuery'),
                    showLabel: false,
                    theme: 'theme-1'
                });

                this.$el.find('.search')
                    .append(this.searchForm.render().$el);

            }

       },

        // ## renderSearchFilters
        //
        // Show the search filters on the page.

        renderSearchFilters: function () {

            // If this is the first time this
            // method has been called, we need
            // to create the filter list. Othwerwise
            // we use what already exists.

            this.searchFiltersList = this.searchFiltersList ||
                new Stem.Views.SearchFiltersAsList({
                    collection: this.model.get('searchFilters')
                });

            // In either case, we want to (re-)render
            // the filter list.

            this.searchFiltersList.render();

            // Insert the filter list's view into
            // our view.

            this.$el.find('.results-filter')
                .append(this.searchFiltersList.$el);

            // If the filters change, update the search
            // presentation. Because changing one radio
            // button (selecting it) necessarily changes
            // another one (whatever was previously selected),
            // we debounce this event.

            this.listenTo(
                this.model.get('searchFilters'),
                'change',
                _(this.arrangeResults).debounce(16)
            );

        },

        // ## renderResults
        //
        // Create markup for the search results.

        renderResults: function () {

            this.contentMainView = this.contentMainView ||
                new Stem.Views.OaeAsMainSearchGroup({
                    model: this.model.get('facets').content.results
                });

            this.contentSecondaryView = this.contentSecondaryView ||
                new Stem.Views.OaeAsSecondarySearchGroup({
                    model: this.model.get('facets').content.results
                });

            this.coursesMainView = this.coursesMainView ||
                new Stem.Views.OaeAsMainSearchGroup({
                    model: this.model.get('facets').courses.results
                });

            this.coursesSecondaryView = this.coursesSecondaryView ||
                new Stem.Views.OaeAsSecondarySearchGroup({
                    model: this.model.get('facets').courses.results
                });

            this.groupsMainView = this.groupsMainView ||
                new Stem.Views.OaeAsMainSearchGroup({
                    model: this.model.get('facets').groups.results
                });

            this.groupsSecondaryView = this.groupsSecondaryView ||
                new Stem.Views.OaeAsSecondarySearchGroup({
                    model: this.model.get('facets').groups.results
                });

            this.contentMainView.render();
            this.contentSecondaryView.render();
            this.coursesMainView.render();
            this.coursesSecondaryView.render();
            this.groupsMainView.render();
            this.groupsSecondaryView.render();

            this.arrangeResults();
            
            this.listenTo(this.contentSecondaryView, 'expand', this.expand);
            this.listenTo(this.coursesSecondaryView, 'expand', this.expand);
            this.listenTo(this.groupsSecondaryView,  'expand', this.expand);

        },

        // ## arrangeResults
        //
        // Arrange the search results on the page.

        arrangeResults: function () {

            // First detach existing elements from the DOM.

            this.contentMainView.$el.detach();
            this.contentSecondaryView.$el.detach();
            this.coursesMainView.$el.detach();
            this.coursesSecondaryView.$el.detach();
            this.groupsMainView.$el.detach();
            this.groupsSecondaryView.$el.detach();
            
            // Clear any expanded or compressed attributes

            this.contentSecondaryView.$el.attr('data-status', '');
            this.coursesSecondaryView.$el.attr('data-status', '');
            this.groupsSecondaryView.$el.attr('data-status', '');

            // Insert the elements in the correct locations
            // depending on which filter is selected.

            if (this.model.get('facets').content.filter.get('selected')) {

                this.$el.find('.results-main')
                    .append(this.contentMainView.$el);
                this.$el.find('.results-secondary')
                    .append(this.coursesSecondaryView.$el)
                    .append(this.groupsSecondaryView.$el);

            } else if (this.model.get('facets').courses.filter.get('selected')) {

                this.$el.find('.results-main')
                    .append(this.coursesMainView.$el);
                this.$el.find('.results-secondary')
                    .append(this.groupsSecondaryView.$el)
                    .append(this.contentSecondaryView.$el);

            } else if (this.model.get('facets').groups.filter.get('selected')) {

                this.$el.find('.results-main')
                    .append(this.groupsMainView.$el);
                this.$el.find('.results-secondary')
                    .append(this.contentSecondaryView.$el)
                    .append(this.coursesSecondaryView.$el);

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

            this.rendersearchForm();
            this.renderSearchFilters();
            this.renderResults();

            // Return view for method chaining.

            return this;  // for method chaining

        },
        
        expand: function (results) {

            this.contentSecondaryView.$el.attr(
                'data-status',
                results === this.contentSecondaryView ? 'expanded' : 'compressed'
            );
            this.coursesSecondaryView.$el.attr(
                'data-status',
                results === this.coursesSecondaryView ? 'expanded' : 'compressed'
            );
            this.groupsSecondaryView.$el.attr(
                'data-status',
                results === this.groupsSecondaryView  ? 'expanded' : 'compressed'
            );

        }

    });

})();
