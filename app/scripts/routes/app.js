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
            'industry':           'industry',
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
                $('.header').attr('data-theme', theme);
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
        },

        teachers: function() {
            this.setDiscovery(1);
            this.loadPage('landing','theme-1-dark');
        },

        schools: function() {
            this.setDiscovery(2);
            this.loadPage('landing','theme-1-dark');
        },

        industry: function() {
            this.setDiscovery(3);
            this.loadPage('landing','theme-1-dark');
        },

        search: function(query) {
            query = query || "";
            this.teacherSearch.searchQuery.set('query',
                decodeURIComponent(query));
            this.loadPage('teachers-search','theme-1');
        },

        initialize: function() {

            var app = this;

            // Create the models that back each of the
            // app's "pages."

            this.teacherSearch = new Stem.Models.TeacherSearch();

            // Create and render the views for
            // each section. It's okay to render
            // them now because they'll remain
            // hidden until the user navigates
            // to them.

            this.teacherSearchPage = new Stem.Views.TeacherSearchPage({
                el: $('#teachers-search'),
                model: this.teacherSearch
            }).render();

            // Now that the teachers search info
            // is available, replace the generic
            // search form on the landing page with
            // a teacher-focused one.

            this.landingSearch = new Stem.Views.SearchForm({
                model: this.teacherSearch.searchQuery,
                theme: 'theme-1'
            });

            $('#teachers-discovery-search-form')
                .replaceWith(this.landingSearch.render().$el);

            this.landingSearch.on('submit', function() {
                var query = app.teacherSearch.searchQuery.get('query');
                app.navigate('search/' + encodeURIComponent(query));
                app.loadPage('teachers-search', 'theme-1');
            });

            // For other models, we need geographic information.
            // Request that now and continue processing when it's
            // available.

            $.getJSON('http://ipinfo.io/json', function(ipInfo) {

//console.log('using stubbed ipInfo for development');
//var ipInfo = {"ip":"73.54.166.233","hostname":"c-73-54-166-233.hsd1.ga.comcast.net","city":"Woodstock","region":"Georgia","country":"US","loc":"34.1190,-84.4477","org":"AS7922 Comcast Cable Communications, Inc.","postal":"30188"};

                // Save the IP information in the root object.

                Stem.user.ipInfo = ipInfo;

            });

            // Everything's ready, so start enable
            // the router by starting history.

            Backbone.history.start();

        }
    });

})();
