/*global window, Stem, _, Backbone, $*/

// The parent component for the entire application
// is the `app` router. (It's the only router used,
// and it's pretty simple at that.)

Stem.Routers = Stem.Routers || {};

(function () {
    'use strict';

    Stem.Routers.App = Backbone.Router.extend({

        // The STEM application is about the simplest
        // possible single page app. Each "page" is
        // bootstrapped as a `<section>` in the
        // `index.html` file, so the only routes we
        // need are routes corresponding to the
        // various sections.

        routes: {
            '':                   'landing',
            'teachers':           'teachers',
            'schools':            'schools',
            'partners':           'partners',
            'search(/)(:query)':  'search'
        },

        // We use a convenience function to
        // switch to a specific section. It's
        // first parameter is the `id` of the
        // destination section. The second
        // (optional) parameter is a theme
        // to apply to the header.

        loadPage: function(id,theme) {

            // For now, to "switch" pages, all we do
            // is set the `show` or `hide` classes on
            // the sections as appropriate.

            $('section').not('#' + id).removeClass('show').addClass('hide');
            $('section#' + id).removeClass('hide').addClass('show');

            // We also want to update the navigation
            // bar with a theme appropriate to the
            // page. To do that, we set the appropriate
            // `data-` attribute.

            if (theme) {
                $('header').attr('data-theme', theme);
            }

            // Close the navigation menu (in case it was
            // used to trigger the page change).

            $('#nav-toggle').prop('checked', 0);
            $('main').attr('data-nav-expanded', false);

            // And finally, set the scroll position to
            // the top of the new "page".

            _.defer(window.scrollTo, 0, 0);

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

        landing: function() {
            this.setDiscovery(1);
            this.loadPage('landing','theme-1-dark');
            this.discoveryContent.show('teachers');
        },

        teachers: function() {
            this.setDiscovery(1);
            this.loadPage('landing','theme-1-dark');
            this.discoveryContent.show('teachers');
        },

        schools: function() {
            this.setDiscovery(2);
            this.loadPage('landing','theme-1-dark');
            this.discoveryContent.show('schools');
        },

        partners: function() {
            this.setDiscovery(3);
            this.loadPage('landing','theme-1-dark');
            this.discoveryContent.show('partners');
        },

        search: function(query) {
            query = query || "";
            this.teacherSearch.searchQuery.set('query',
                decodeURIComponent(query));
            this.loadPage('teachers-search','theme-1');
        },

        initialize: function() {

            // Create the models that back each of the
            // app's "pages" and other content blocks.

            this.discovery = new Stem.Models.Discovery();
            this.teacherSearch = new Stem.Models.TeacherSearch();

            // Create and render the views for each
            // page or content block. It's okay to
            // render them now because they'll remain
            // hidden until the user navigates to
            // them.

            this.discoveryContent = new Stem.Views.DiscoveryAsContent({
                model: this.discovery
            }).render();

            this.teacherSearchPage = new Stem.Views.TeacherSearchAsPage({
                el: $('#teachers-search'),
                model: this.teacherSearch
            }).render();

            this.listenTo(this.discoveryContent, 'navigate', function(hash) {

                // Preserve the current scroll position
                var pos = $(window).scrollTop();

                // Add the new hash to the browser history
                this.navigate(hash);

                // And restore the scroll position
                $(window).scrollTop(pos);

            });

            // Add any required logic that ties the
            // different pages or content blocks
            // together.

            // Now that the teachers search info
            // is available, replace the generic
            // search form on the landing page with
            // a teacher-focused one. First step
            // is creating a view for the dynamic
            // search form.

            this.landingSearch = new Stem.Views.SearchAsForm({
                model: this.teacherSearch.searchQuery,
                theme: 'theme-1'
            });

            // Inject the new search form into the
            // page.

            $('#teachers-discovery-search-form')
                .replaceWith(this.landingSearch.render().$el);

            // Watch for submission of the new search
            // form and navigate appropriately.

            this.landingSearch.on('submit', function() {

                // Retrieve the submitted query.

                var query = this.teacherSearch.searchQuery.get('query');

                // Update the address bar with the
                // query for link sharing and bookmarks.

                this.navigate('search/' + encodeURIComponent(query));

                // Load the search page.

                this.loadPage('teachers-search', 'theme-1');

            }, this);

            // Everything's ready, so enable history management.

            Backbone.history.start();

        }
    });

})();
