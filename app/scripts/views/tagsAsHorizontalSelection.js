/*global Stem, Backbone, JST */

// Trivial Backbone view that renders a tags
// collection in a Horizontally arranged selection.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TagsAsHorizontalSelection = Backbone.View.extend({

        template: JST['app/scripts/templates/tagsAsHorizontalSelection.ejs'],
        
        // Wrap the view in a `<span>` instead of the default
        // `<div>` to avoid `display:block;`.

        tagName: 'span',
        
        // Once the view is created, we need to listen
        // for reset events in order to update the
        // view contents. Resets occur, for example,
        // once data is loaded asynchronously.

        initialize: function () {
            
            this.listenTo(this.collection, 'sync reset', this.render);

        },

        render: function () {

            var $el = this.$el;

            // First render the overall template.

            $el.html(this.template());

            // Then add the individual tags.

            this.collection.each(function(tag) {

                // Create a view for the tag model.

                var tagView = new Stem.Views.TagAsHorizontalSelectionItem({
                    model: tag
                });

                // Render it.

                tagView.render();

                // Add it to the element we're building.

                $el.append(tagView.el);

            });

            // Return the view for method chaining.

            return this;
        }

    });

})();
