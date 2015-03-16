/*global Stem, _, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.SearchForm = Backbone.View.extend({

        // Markup stored as external template.

        template: JST['app/scripts/templates/searchForm.ejs'],

        // First level element is a `<form>`.

        tagName: 'form',

        // Use `.search` class to get search form styles.

        className: 'search',

        // Listen to events that change the input or
        // click on the search link to initiate a search.

        events: {
            'input input': 'changed',
            'submit': 'submitted'
        },

        // Default values for options.

        defaults: {
            showLabel: true,   // Should label be visible
            theme: ''          // Theme to apply
        },

        // Options supported by this view
        // include:
        // - `.theme` for a theme class
        // - `.showLabel` set `false` to suppress display of search label

        initialize: function (options) {

            // Save any options passed to constructor.

            this.options = _.extend({}, this.defaults, options);

            // If the model changes, we might need to
            // update the view.

            this.listenTo(this.model, 'change', this.modelUpdated);

            // Return view for method chaining.

            return this;

        },

        render: function () {

            // After normal render, add a11y `role`.

            this.$el.html(this.template(this.model.toJSON()))
                .attr('role','search');

            // Set the initial query parameters

            if (this.model.get('query')) {
                this.$el.find('input').val(this.model.get('query'));
            }

            // If a theme has been requested, add it
            // as a class.

            if (this.options.theme) {
                this.$el.addClass(this.options.theme);
            }

            // If the label should be visible, remove
            // the screen-reader only class.

            if (this.options.showLabel) {
                this.$el.find('label').removeClass('util--sr-only');
            }

            // Return view for method chaining.

            return this;

        },

        // If the user changes the query value, we
        // need to update the underlying model.

        changed: function() {

            // Get the current selected state.

            var query = this.$el.find('input').val();

            // Update the model with the current query..

            this.model.set('query', query);

        },

        // If user clicks on the search button,
        // pass it up the chain so the search
        // can be executed.

        submitted: function(ev) {

            // Trigger a submit event on this view.

            this.trigger('submit');

            // Prevent further event handling.

            ev.preventDefault();
            return false;

        },

        // If the model has changed due to,
        // another view, we update this view.

        modelUpdated: function() {

            var query = this.model.get('query');

            // Only update the view if it's not in
            // focus to avoid messing with the users
            // while they're typing.

            if (!this.$el.find('input').is(":focus")) {

                this.$el.find('input').val(query);

            }

        }

    });

})();
