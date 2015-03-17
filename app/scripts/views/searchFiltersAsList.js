/*global Stem, Backbone */

// Basic Backbone view that renders
// a set of search filters as a list.


Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.SearchFiltersAsList = Backbone.View.extend({

        tagName: 'ul',

        className: 'results-filter__list',

        // If the world were sane, we'd let the individual
        // views worry about `change` events on the radio button
        // `<input>` elements. Unfortunately, browser support for
        // this (correct) behavior is all over the map, and we
        // can't count on it to work properly. We'll have to watch
        // for changes at the group level and tell all the
        // individual elements with a custom event.

        events: {
            'change input': 'change'
        },

        render: function () {

            // All items have a common group Id.

            var groupId = _.uniqueId(),
                view = this;

            // Render the individual list items.

            this.children = [];

            this.collection.each(function(filter) {
                var childView = new Stem.Views.SearchFilterAsItem({
                    groupId: groupId,
                    model: filter
                });
                view.children.push(childView);
                view.$el.append(childView.render().$el);
            });

            return this;  // for method chaining

        },

        change: function () {

            // Since the group changed, let all the
            // child views know. Note that we add a
            // delay before signalling the children
            // because some browsers fire the `change`
            // event **before** they update the
            // `checked` property of the `<input>`
            // elements. (Yuck.)

            var children = this.children;

            _(function() {
                children.forEach(function(childView) {
                    childView.trigger('groupChange');
                });
            }).delay(16);


        }

    });

})();
