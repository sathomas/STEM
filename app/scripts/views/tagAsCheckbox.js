/*global Stem, Backbone, _, JST */

// Basic Backbone view that renders
// a tag item as a checkbox.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TagAsCheckbox = Backbone.View.extend({

        template: JST['app/scripts/templates/tagAsCheckbox.ejs'],

        className: 'tagset__tag',

        // We listen for change events on our `<input>` element.

        events: {
            'change input': 'change'
        },

        // If the user changes a selection value, we
        // need to update the underlying model.

        change: function() {

            // Get the current selected state.

            var selected = this.$el.find('input').is(':checked');

            // Update the model with the current state of
            // the selection.

            this.model.set('selected', selected);

        },

        initialize: function () {

            // If the underlying model changes, we
            // need to update the view.

            this.listenTo(this.model, 'change', this.update);
            return this;

        },

        render: function () {

            // Render the model using the template. We supply
            // a unique identifier for the DOM elements. We
            // can't use the model's `id` since we may want to
            // create multiple views from the same model.

            this.$el.html(this.template(
                _(this.model.toJSON()).extend({
                    id: _.uniqueId()})
                ));

            // Return the view for method chaining.

            return this;
        },

        update: function () {

            // Only modify the DOM if neccessary to avoid
            // annoying flashes of style changes.

            var selected = this.$el.find('input').is(':checked'),
                modelSelected = this.model.get('selected');

            if (selected !== modelSelected) {
                this.$el.find('input').prop('checked', modelSelected);
            }

        }

    });

})();
