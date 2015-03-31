/*global window, Stem, _, Backbone, $*/

// The parent component for the entire application
// is the `app` router. (It's the only router used.)

Stem.Routers = Stem.Routers || {};

(function () {
    'use strict';

    Stem.Routers.App = Backbone.Router.extend({

        // The STEM application is about the simplest
        // possible single page app. Each "page" is
        // bootstrapped as a `<section>` in the
        // `index.html` file, so the only routes we
        // need are routes corresponding to the
        // various sections. We also define a
        // parameterized search page a default
        // page (which is the same as the primary
        // landing page).

        routes: {
            '':         'landing',
            'teachers': 'teachers',
            'admins':   'admins',
            'partners': 'partners',
            'search(/)(:query)(/:facet)': 'search',
            '*default': 'landing',
        },

        // We use a convenience function to
        // switch to a specific section. Its
        // first parameter is the `id` of the
        // destination section. The second
        // (optional) parameter is a theme
        // to apply to the header.

        loadPage: function(id, theme) {

            // To "switch" pages set the `data-hide`
            // attribute on the sections as
            // appropriate. All sections other than
            // the selected one have `data-hide="1"`,
            // and the selected section has
            // `data-hide="0"`.

            $('section').not('#' + id).attr('data-hide','1');
            $('section#' + id).attr('data-hide','0');

            // We also want to update the navigation
            // bar with a theme appropriate to the
            // page. To do that, we set the appropriate
            // `data-` attribute.

            if (theme) {
                $('header').attr('data-theme', theme);
            }

            // Close the navigation menu (in case it was
            // used to trigger the page change). Since
            // our event handler only detects changes
            // initiated by the user, we also have to
            // manually clear the `data-nav-expanded`
            // attribute on the `<main>` elements.

            $('#nav-toggle').prop('checked', 0);
            $('main').attr('data-nav-expanded', '0');

            // And finally, set the scroll position to
            // the top of the new "page" if we're switching
            // to the search results. We defer this until
            // the execution stack clears to make sure
            // that no other code reverses our setting.

            if (id === 'teachers-search') {
                _.defer(window.scrollTo, 0, 0);
            }

        },

        // Convenience function to set the discovery
        // section on the landing page by setting the
        // appropriate radio buttons in the nav.

        setDiscovery: function(discoveryIdx) {

            // Set the appropriate button and clear all
            // the others.

            $('#discovery-nav input[type="radio"]').each(function(idx) {
                $(this).prop('checked', (discoveryIdx === (idx+1)));
            });

            // Since changing the property doesn't trigger
            // a `change` event (!), we have to set the `data-`
            // attribute explicitly.

            $('#discovery-nav').attr('data-discovery-nav', discoveryIdx);

        },

        // The default landing page is the
        // teachers page.

        landing: function() {
            this.teachers();
        },

        // The individual route handlers follow. All they
        // do is set the discovery navigation to the
        // appropriate section, load the landing page,
        // and show the appropriate discovery content.

        teachers: function() {
            this.setDiscovery(1);
            this.loadPage('landing','theme-1-dark');
            this.discoveryContent.show('teachers');
        },

        admins: function() {
            this.setDiscovery(2);
            this.loadPage('landing','theme-1-dark');
            this.discoveryContent.show('admins');
        },

        partners: function() {
            this.setDiscovery(3);
            this.loadPage('landing','theme-1-dark');
            this.discoveryContent.show('partners');
        },

        // The search page is a little more involved
        // because we need to set up the appropriate
        // facet for the search. If there is no
        // explicit facet in the URL, we default to
        // the content facet. We also set the free-
        // text query contents based on the URL, if
        // any content is available. After setting
        // up the search facet and query, we load
        // the search page.

        search: function(query, facet) {
            query = query || '';
            facet = facet || 'content';
            this.teacherSearch.set('facet',
                decodeURIComponent(facet));
            this.teacherSearch.searchQuery.set('query',
                decodeURIComponent(query));
            this.loadPage('teachers-search','theme-1');
        },

        // The `initialize` function performs most of
        // the work in bootstrapping the app.

        initialize: function() {

            // Create the models that back each of the
            // app's "pages" and other content blocks.
            // Currently there are two primary models
            // representing the two major sections of
            // content on the site.
            //
            // - [discovery](discovery.html) handles
            //   the "Discovery blocks" on the main
            //   landing page.
            // - [teacherSearch](teacherSearch.html)
            //   manages the search results page.
            //   (Currently the only search results
            //   the site provides are focused on
            //   teachers.)
            //
            // Those two models both include general
            // seach functionality, and we want the
            // search query values to be synchronized.
            // (In other words, if a user starts
            // typing a search query in the discovery
            // block, we want that partial search
            // query to show up in the teacher search
            // results if the user switches to the
            // search resuls page. To have both models
            // share search queries, we create a common
            // [search](search.html) model that both
            // of the main models can share.

            this.searchQuery = new Stem.Models.Search({
                label: 'Search for resources',
                placeholder: 'Search the Incubator'
            });

            // Now we can create the principle models
            // that include this query.

            this.discovery = new Stem.Models.Discovery({
                searchQuery: this.searchQuery
            });
            this.teacherSearch = new Stem.Models.TeacherSearch({
                searchQuery: this.searchQuery
            });

            // Create and render the views for each
            // page or content block. It's okay to
            // render them now because they'll remain
            // hidden until the user navigates to
            // them. Start with the
            // [discoveryContent](discoveryAsContent.html)
            // view for the "Discovery blocks".

            this.discoveryContent = new Stem.Views.DiscoveryAsContent({
                model: this.discovery
            }).render();

            // That discoveryContent view triggers
            // `navigate` events when the user navigates
            // to a new discovery section. We don't have
            // to do very much when that event occurs
            // since the CSS takes care of exposing the
            // appropriate content. We do want to make
            // sure that the navigation is added to
            // the browser history, though, so that the
            // back/forward buttons work as expected.

            this.listenTo(this.discoveryContent, 'navigate', function(hash) {

                // Preserve the current scroll position
                var pos = $(window).scrollTop();

                // Add the new hash to the browser history
                this.navigate(hash);

                // And restore the scroll position
                $(window).scrollTop(pos);

            });

            // Now we create the second of our two
            // main views. This view controls the
            // [teacherSearchPage](teacherSearchAsPage.html)
            // part of the site.

            this.teacherSearchPage = new Stem.Views.TeacherSearchAsPage({
                el: $('#teachers-search'),
                model: this.teacherSearch
            }).render();

            // Just as with the discoveryContent view,
            // the teacherSearch model triggers a
            // `navigate` event when the user performs
            // a navigation action. As before, the view
            // itself handles most of the work, but we
            // do want to add the new navigation URL
            // to the browser history for back/forward
            // button operation.

            this.listenTo(this.teacherSearch, 'navigate', function(hash) {

                // Add the new hash to the browser history, but
                // only if we're on the search "page". If we're
                // on the landing page, then the router itself
                // will take care of the history.

                if (window.location.hash.indexOf('#search') === 0) {

                    this.navigate('search/' + hash);

                }

            });

            // Add any required logic that ties the
            // different pages or content blocks
            // together.

            // Now that the teachers search info
            // is available, replace the generic
            // search form on the landing page with
            // a teacher-focused one. We're going
            // to link this search form with the
            // form on the search results page so
            // that the two stay in sync. To do
            // that, we'll use the same model for
            // both forms.

            // Create a view for the dynamic
            // search form.

            this.landingSearch = new Stem.Views.SearchAsForm({
                model: this.searchQuery,
                theme: 'theme-1'
            });

            // Inject the new search form into the
            // page.

            $('#teachers-discovery-search-form')
                .replaceWith(this.landingSearch.render().$el);

            // Watch for updates to the search query so
            // we can update the links to other search
            // facets. We debounce this event handler
            // to avoid thrashing while the user types.

            this.searchQuery.on('change', _(function() {

                // When the user pauses typing,
                // grab the contents of the search
                // field so far.

                var query = encodeURIComponent(
                    this.teacherSearch.get('searchQuery').get('query')
                );

                // Update any interior links to
                // search results with the new
                // query.

                $('#teachers-search-courses').attr('href',
                    '#search/' + query + '/courses'
                );

                $('#teachers-search-groups').attr('href',
                    '#search/' + query + '/groups'
                );

            }).debounce(250), this);

            // Watch for submission of the new search
            // form and navigate appropriately.

            this.landingSearch.on('submit', function() {

                // Retrieve the submitted query.

                var query = this.teacherSearch.get('searchQuery').get('query');

                // Although in general we don't trigger
                // a full route when we update the navigation,
                // in this case we really do want the app
                // to behave exactly as if the user had
                // navigated to the web site. Setting `trigger: true`
                // is simpler than replicating the code in
                // multiple places.

                this.navigate('search/' + encodeURIComponent(query) + '/content',
                    {trigger: true});

            }, this);

            // Everything's ready, so enable history management.

            Backbone.history.start();

        }
    });

})();
