/*global Stem, Backbone, JST */

// Trivial Backbone view that renders a set of tags
// as a set of Horizontally arranged selection options.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TagSetAsHorizontalSelection = Backbone.View.extend({

        template: JST['app/scripts/templates/tagSetAsHorizontalSelection.ejs'],

        // Wrap the view in a `<span>` instead of the default
        // `<div>` to avoid `display:block;`.

        tagName: 'span',

        render: function () {

            var $el = this.$el;

            // First render the overall template.

            $el.html(this.template(this.model.toJSON()));

            // Then add the tags collection, first by
            // creating a view for it.

             var tagsView = new Stem.Views.TagsAsHorizontalSelection({
                collection: this.model.get('tags')
            });
            
            // And then rendering the view.
            
            tagsView.render();

            // Add finally adding it to our element.

            $el.find('fieldset').append(tagsView.el);

            // Return the view for method chaining.

            return this;
        }

    });

})();
