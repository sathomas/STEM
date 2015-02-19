/*global Stem, Backbone, JST */

// Basic Backbone view that renders
// a subject model as a selection option.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TagAsHorizontalSelectionItem = Backbone.View.extend({

        template: JST['app/scripts/templates/tagAsHorizontalSelectionItem.ejs'],

        // Wrap the view in a `<span>` instead of the default
        // `<div>` to avoid `display:block;`.

        tagName: 'span',
        
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

            this.listenTo(this.model, 'change', this.render);
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
        }

    });

})();
