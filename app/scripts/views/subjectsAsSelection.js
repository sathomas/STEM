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

            var $el = this.$el;

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

                // And add it to the DOM.

                $el.find('fieldset').append(subjectView.el);

            });

            // Return the view for method chaining.

            return this;
        }

    });

})();
