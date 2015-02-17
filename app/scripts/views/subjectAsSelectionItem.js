/*global Stem, Backbone, JST*/

// Trivial Backbone view that renders
// a subject model as a selection option.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.SubjectAsSelectionItem = Backbone.View.extend({

        template: JST['app/scripts/templates/subjectAsSelectionItem.ejs'],

        render: function () {

            // Render the model using the template.

            this.$el.html(this.template(this.model.toJSON()));

            // Return the view for method chaining.

            return this;
        }

    });

})();
