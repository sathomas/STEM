/*global Stem, Backbone */

// Trivial Backbone view that renders a tags
// collection in a set of checkboxes.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TagsAsCheckboxes = Backbone.View.extend({

        // Once the view is created, we need to listen
        // for reset events in order to update the
        // view contents. Resets occur, for example,
        // once data is loaded asynchronously.

        initialize: function () {

            this.listenTo(this.collection, 'sync reset', this.render);

        },

        render: function () {

            var $el = this.$el;

            // Then add the individual tags.

            this.collection.each(function(tag) {

                // Create a view for the tag model.

                var tagView = new Stem.Views.TagAsCheckbox({
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
