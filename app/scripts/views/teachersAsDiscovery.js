/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TeachersAsDiscovery = Backbone.View.extend({

        template: JST['app/scripts/templates/teachersAsDiscovery.ejs'],

        tagName: 'article',

        className: 'discovery',

        id: 'teachers',

        initialize: function () {

            // If the search query model is reset, we need
            // to update that part of our view.

            this.listenTo(
                this.model,
                'set:searchQuery',
                this.renderSearch
            );

            // If the search query itself changes, we need
            // to update the invitation links.

            this.listenTo(
                this.model.get('searchQuery'),
                'change:query',
                this.updateInvites
            );

        },

        renderSearch: function () {

            // Make sure we have a place for the search
            // bar. If not, then we'll get another chance
            // to render this when the main view is rendered.

            if (!this.$el.is(':empty')) {

                // If a view already exists, remove it.

                if (this.searchBar) {
                    this.searchBar.remove();
                }

                // Create a view and render it.

                this.searchBar = new Stem.Views.SearchAsForm({
                    el: this.$el.find('#teachers-discovery-search-form'),
                    model: this.model.get('searchQuery'),
                    theme: 'theme-1'
                }).render();

                // Update the invitation links to
                // account for a new query string.

                this.updateInvites();

            }

        },

        updateInvites: function () {

            var query = this.model.get('searchQuery').get('query');

            this.$el.find('#teachers-search-courses').attr('href',
                '#search/' + query + '/courses'
            );

            this.$el.find('#teachers-search-groups').attr('href',
                '#search/' + query + '/groups'
            );

        },

        render: function () {

            // Normally this view is used to "fill in"
            // components that already exist on a static
            // page. When that's the case, we will have
            // been provided an element that already has
            // content. To be safe, though, we check to
            // make sure that content is present. If it
            // isn't we use our template as a starting
            // point.

            if (this.$el.is(':empty')) {

                // We don't need to supply any
                // attributes to the view since
                // it's just a static skeleton.

                this.$el.html(this.template());

            }

            // Render the search bar in the discovery
            // section.

            this.renderSearch();

            return this; // for method chaining

        }

    });

})();
