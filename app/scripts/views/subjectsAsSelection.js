/*global Stem, Backbone, JST */

// Trivial Backbone view that renders
// a subject collection as a set of
// selection options.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.SubjectsAsSelection = Backbone.View.extend({

        template: JST['app/scripts/templates/subjectsAsSelection.ejs'],

        initialize: function () {

            // If the collection is reset, re-render
            // the view.

            this.listenTo(this.collection, 'reset sync', this.render);

        },

        render: function () {

            var view = this,
                $el = this.$el;

            // First render the overall template

            $el.html(this.template());

            // Then add the individual subjects

            this.collection.each(function (subject) {

                // Create a view for the subject model.

                var subjectView = new Stem.Views.SubjectAsSelectionItem({
                    model: subject
                });

                // Render it.

                subjectView.render();

                // Add it to the DOM.

                $el.find('fieldset').append(subjectView.el);

                // And listen for any change events on it.

                view.listenTo(subjectView, 'selection:change', view.selectionChanged);

            });

            // Return the view for method chaining.

            return this;
        },

        // We use an event handler to deal with any changes
        // to the selections.

        selectionChanged: function() {

            // Iterate through the models to get the current
            // overall selection state, starting with an
            // empty set.

            var selected = [];

            this.collection.each(function(subject) {
                if (subject.get('selected')) {
                    selected.push(subject.get('subject'));
                }
            });

            // Trigger a custom event to indicate that the
            // selection has changed.

            this.collection.trigger('selection:change', selected);

        }

    });

})();
