/*global Stem, Backbone, JST */

// Basic Backbone view that renders
// a subject model as a selection option.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.SubjectAsSelectionItem = Backbone.View.extend({

        template: JST['app/scripts/templates/subjectAsSelectionItem.ejs'],

        // We listen for change events on our `<input>` element.

        events: {
            'change input': 'change'
        },

        // We don't need to process the change events ourselves,
        // but we do want to trigger an overvall event to any
        // parent that's listening.

        change: function() {

            // Get the current selected state.

            var selected = this.$el.find('input').is(':checked');

            // Update the model with the current state of
            // the selection.

            this.model.set('selected', selected);

            // We trigger the custom event `selection:change`
            // and pass it the model as well as an argument
            // that indicates whether the selection is now
            // checked or not.

            this.trigger('selection:change', this.model, selected);

        },

        render: function () {

            // Render the model using the template.

            this.$el.html(this.template(this.model.toJSON()));

            // Return the view for method chaining.

            return this;
        }

    });

})();
