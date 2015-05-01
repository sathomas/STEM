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
            
            // If Google Analytics is available, track
            // the page load.
            
            if (typeof ga !== 'undefined') {
                ga('send', 'pageview', id);
                ga('set', 'page', id);
            }

        },

        // Convenience function to set the discovery
        // section on the landing page by setting the
        // appropriate radio buttons in the nav.

        setDiscovery: function(discoveryId, dontScroll) {
            
            // Find the index of the appropriate
            // article so we can set the attribute
            // for CSS.
            
            var discoveryIdx = 0;
            $('article.discovery').each(function(idx){
                if ($(this).attr('id') === discoveryId + '_js') {
                    discoveryIdx = idx+1;
                }
            });

            // Set the appropriate button and clear all
            // the others.

            $('#discovery-nav input[type="radio"]').each(function(idx) {
                $(this).prop('checked', (discoveryIdx === (idx+1)));
            });

            // Since changing the property doesn't trigger
            // a `change` event (!), we have to set the `data-`
            // attribute explicitly.

            $('#discovery-nav').attr('data-discovery-nav', discoveryIdx);
            
            // If the view is a mobile view in which
            // the different discovery sections are
            // stacked and the discovery navigation is
            // hidden, scroll to the selected section.

            if ($('#discovery-nav').css('display') === 'none') {
                
                // Calculating the scroll position is a
                // little complicated because we have to
                // account for the fact that the menu
                // may be expanded when this function
                // is called, but the desired position
                // is based on a collapsed menu.
                
                var pos = $('#' + discoveryId + '_js').offset().top -
                    parseInt($('main').css('padding-top'));
                    
                // If the optional `dontScroll` parameter
                // is true, we don't want to scroll to
                // the discovery position. Instead, scroll
                // to the top.

                $('body').scrollTop(dontScroll ? 0 : pos);

            }

        },

        // The default landing page is the
        // teachers page, but we don't want
        // to scroll to the section.

        landing: function() {
            this.loadPage('landing','theme-1-dark');
            this.setDiscovery('teachers', true);
        },

        // The individual route handlers follow. All they
        // do is set the discovery navigation to the
        // appropriate section, load the landing page,
        // and show the appropriate discovery content.

        teachers: function() {
            this.loadPage('landing','theme-1-dark');
            this.setDiscovery('teachers');
        },

        admins: function() {
            this.loadPage('landing','theme-1-dark');
            this.setDiscovery('admins');
        },

        partners: function() {
            this.loadPage('landing','theme-1-dark');
            this.setDiscovery('partners');
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
            this.searchQuery.set('query',
                decodeURIComponent(query));
            this.loadPage('teachers-search','theme-1');

            // Set the scroll position to the top
            // of the new "page" since we're switching
            // to the search results.

            $('body').scrollTop(0);

        },
        
        // User clicked the main navigation bar

        navClicked: function(ev) {

            // Normally we don't have to do anything
            // here. If, however, the user clicks on
            // the menu item that matches what's
            // already in the hash, the browser ignores
            // it. We don't want to ignore it.

            if (window.location.hash === $(ev.target).attr('href')) {
                this[window.location.hash.slice(1)].call(this);
            }
            
        },

        // The `initialize` function performs most of
        // the work in bootstrapping the app.

        initialize: function() {
            
            // The initial static page has several
            // elements with `id` attributes matched
            // to URL fragments. We define the 
            // attributes that way so that the site
            // works for users without JavaScript
            // (albeit with reduced functionality).
            // Since we're here executing this code,
            // though, JavaScript is, by definition,
            // available. In this case, we don't
            // want the browser scrolling to these
            // page elements. Doing so would
            // interfere with the hashtag routing
            // of Backbone. To eliminate the 
            // the conflict, we replace the original
            // `id` attribute values with new values
            // that don't correspond to hashtags.
            
            _(['teachers','admins','partners']).each(function(id) {
                $('#' + id).attr('id', id + '_js');
            });

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
            // results if the user navigates to the
            // search resuls page. To have both models
            // share search queries, we create a common
            // [search](search.html) model that both
            // of the main models can share.

            this.searchQuery = new Stem.Models.Search({
                label: 'Search resources',
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
                el: $('#landing'),
                model: this.discovery
            }).render();

            // Now we create the second of our two
            // main views. This view controls the
            // [teacherSearchPage](teacherSearchAsPage.html)
            // part of the site.

            this.teacherSearchPage = new Stem.Views.TeacherSearchAsPage({
                el: $('#teachers-search'),
                model: this.teacherSearch
            }).render();

            // Handle high level events from the views
            // we've created.

            // If the discovery content view detects
            // that the user submits a search form,
            // we want to navigate to the search
            // results "page."

            this.discoveryContent.on('search:submit', function() {

                // Retrieve the submitted query.

                var query = this.searchQuery.get('query');

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

            // The discoveryContent view triggers
            // `navigate` events when the user navigates
            // to a new discovery region. We don't have
            // to do very much when that event occurs
            // since the CSS takes care of exposing the
            // appropriate content. We do want to make
            // sure that the navigation is added to
            // the browser history, though, so that the
            // back/forward buttons work as expected.

            this.listenTo(this.discoveryContent, 'navigate', function(hash) {
                
                // To make the URL hash consistent with
                // non-JavaScript users (e.g. if a JS-user
                // shares a link with a non-JS-user), strip
                // of the special `_js` bit that we added
                // to the `id` attribute during initialization.

                this.navigate(hash.slice(0,-3));

            });

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
            
            // We also have to account for an edge case in 
            // mobile views. If the user starts at a particular
            // section (e.g. `#partners`) and then scrolls back
            // to the top, the URL hash will still be `#partners`.
            // In that case, the browser won't recognize subsequent
            // clicks on the same element in the navigation menu.
            // We have to catch those manually.
            
            $('.site-hdr__navbar__list a').on('click', 
                $.proxy(this.navClicked, this));

            // Everything's ready, so enable history management.

            Backbone.history.start();

        }
    });

})();
