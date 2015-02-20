/*global Stem, Backbone, JST*/

// Backbone view for a collection of groups from
// the OAE rendered as a set of detailed items in
// a featured list.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.GroupsAsFeaturedDetails = Backbone.View.extend({

        template: JST['app/scripts/templates/groupsAsFeaturedDetails.ejs'],

        // We watch for clicks on the "Show me more" button
        // to add more items to the list.

        events: {

            'click .featured__details__action a': 'showMore'

        },

        initialize: function () {

            // We want to watch for `reset` and `sync` events on the
            // collection. For now, those are the only event we care
            // about because our collections aren't dynamic. (Once they're
            // fetched from the OAE, they don't change.)
            //
            // Note that we don't need to listen for `change` events.
            // Backbone fires `change` events on a collection whenever
            // a model within that collection changes. Since our
            // models (like our collections) are static once they're
            // fetched from the OAE, this event should not occur. Even
            // if that changes in the future, we let the individual
            // model views update themselves with any changes since
            // we're not directly rendering any aspect of the individual
            // models within this view.

            this.listenTo(this.collection, 'reset sync', this.render);
        },

        // The general `render()` method is called to set up
        // the view.

        render: function () {

            // We use a property to keep track of how many items
            // we've rendered. Initially none have been rendered.

            this.numRendered = 0;

            // First render the overall template

            this.$el.html(this.template());

            // Then add the individual group items

            if (this.collection.length > 0) {

                // Since there are groups to render, change
                // the "Show me more" button from it's default
                // link style to a regular button style.

                this.$el.find('.featured__details__action a').
                    removeClass('button--link');

                // Remove the "no groups" message.

                this.$el.find('.featured__details__listing').
                    empty();

                // Go ahead and render the items.

                this.renderMore();

            } else {

                // Since no content matches, there aren't
                // any direct actions that make sense.

                this.$el.find('.featured__details__action a').
                    text('Search for more');

            }

            // Return the view for method chaining.

            return this;

        },

        // The `renderMore()` method adds more items to the
        // view incrementally.

        renderMore: function() {

            _(this.collection.filter(function(group, idx) {

                // Only add five items at a time.

                return idx >= this.numRendered &&
                       idx < (this.numRendered + 5);

            }, this)).each(function(group) {

                // Create a view for the model.

                var groupView = new Stem.Views.GroupAsFeaturedDetailsItem({
                    model: group
                });

                // Render it.

                groupView.render();

                // And add it to the DOM.

                this.$el.find('.featured__details__listing').append(groupView.el);

                // Keep track of how many items we've rendered

                this.numRendered++;

            }, this);

            // Have we rendered all that are available?

            if (this.numRendered == this.collection.length) {

                // If we've shown all that we have available,
                // turn the button back into a link (to the
                // OAE website) by changing its style.

                this.$el.find('.featured__details__action a').
                    addClass('button--link').
                    text('Search for more');

            }

        },


        // The `showMore()` method responds to users' clicks
        // on the "Show me more" button/

        showMore: function() {

            // If we've already exhausted all the groups that
            // we have locally, then let the browser continue
            // processing the click. In doing so, it will
            // follow the link to the OAE where the user can
            // perform additional searches.

            if (this.numRendered >= this.collection.length) {

                return true;

            }

            // We've still got some to add, so do it.

            this.renderMore();

            // Return `false` to prevent the browser from
            // following the link.

            return false;
        }

    });

})();
