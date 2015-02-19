/*global Stem, Backbone, JST */

// Basic Backbone view that renders
// a subject model as a selection option.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TagAsVerticalSelectionItem = Backbone.View.extend({

        template: JST['app/scripts/templates/tagAsVerticalSelectionItem.ejs'],

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

        render: function () {

            // Render the model using the template.

            this.$el.html(this.template(this.model.toJSON()));

            // Return the view for method chaining.

            return this;
        }

    });

})();
