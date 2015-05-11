/*global Stem, _, Backbone, JST*/

// Backbone view for the teacher's region of
// the discovery block on the landing page.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.TeachersAsDiscovery = Backbone.View.extend({

        template: JST['app/scripts/templates/teachersAsDiscovery.ejs'],

        tagName: 'article',

        className: 'discovery',

        id: 'teachers',

        // The only user interaction we have to worry
        // about here is the free-form search. The
        // initialization code sets that up. It relies
        // on the `searchQuery` attribute of the
        // backing model to manage the state of the
        // query.

        initialize: function () {

            // If the search query model is reset, we
            // update that part of our view.

            this.listenTo(
                this.model,
                'change:searchQuery',
                this.renderSearch
            );

            // If the search query itself changes, we need
            // to update the invitation links. We debounce
            // this event handler to avoid hammering the
            // browser with updates.

            this.listenTo(
                this.model.get('searchQuery'),
                'change:query',
                _(this.updateInvites).debounce(250)
            );

        },

        // Separate function to focus on rendering
        // the search form that's part of our view.

        renderSearch: function () {

            // Make sure we have a place for the search
            // bar. If not, then we'll get another chance
            // to render this when the main view is rendered.

            if (!this.$el.is(':empty')) {

                // Before we slam a new search form
                // into the view, check to see if there's
                // already one present. If there is,
                // we explicitly remove it so that it
                // can clean up event handlers, etc.

                if (this.searchForm) {
                    this.stopListening(this.searchForm);
                    this.searchForm.remove();
                }

                // Create a view for the search form
                // and render it into our view.

                this.searchForm = new Stem.Views.SearchAsForm({
                    el: this.$el.find('#teachers-discovery-search-form'),
                    model: this.model.get('searchQuery'),
                    theme: 'theme-1'
                }).render();

                // Watch for submit events related to the
                // form.

                this.listenTo(this.searchForm, 'submit', this.submitSearch);

                // Update the invitation links to
                // account for a (potentially) new
                // query string.

                this.updateInvites();

            }

        },

        // The invitation links are links to
        // specific facets of the search results. As the
        // user changes the search query, we update those
        // links to reflect the current query value.

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

            // Add the ARIA attributes for accessibility

            var headingId = _.uniqueId();
            this.$el.attr('aria-labelledby', headingId);
            this.$el.find('h3').attr('id', headingId);

            // Render the search bar in the discovery
            // section.

            this.renderSearch();

            return this; // for method chaining

        },

        submitSearch: function (ev) {

            // Block the default handling of the
            // submit event since we're dealing
            // with it completely within our (single)
            // page app.

            ev.preventDefault();

            // When the user submits the search form,
            // the effect is beyond the scope of this
            // view. We pass it upstairs by triggering
            // an event.

            this.trigger('search:submit');

            return false;  // no need to bubble this event

        }

    });

})();
