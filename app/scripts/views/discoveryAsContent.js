/*global Stem, $, Backbone, JST */

// Backbone view for the landing page discovery
// section. Because that section includes static
// content (to support users without JavaScript),
// this isn't exactly a traditional view. Instead
// of rendering everything from whole cloth via
// a template, we'll surgically update pieces of
// the static page with dynamic content.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.DiscoveryAsContent = Backbone.View.extend({

        template: JST['app/scripts/templates/discoveryAsContent.ejs'],

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

            // Create and render the different child views.

            this.teacherDiscovery = new Stem.Views.TeachersAsDiscovery({
                el: this.$el.find('#teachers'),
                model: this.model.get('teachers')
            }).render();
            this.adminDiscovery = new Stem.Views.AdminsAsDiscovery({
                el: this.$el.find('#admins'),
                model: this.model.get('admins')
            }).render();
            this.partnerDiscovery = new Stem.Views.PartnersAsDiscovery({
                el: this.$el.find('#partners'),
                model: this.model.get('partners')
            }).render();

            // The teacher region of the discovery
            // block includes a search form. The view
            // triggers an event if the user submits
            // that form.

            this.listenTo(this.teacherDiscovery, 'search:submit', this.submitSearch);


            var discovery = this;

            // Look for changes to discovery navigation.

            $('#discovery-nav').on('change', function() {

                // Use setTimeout to delay processing
                // because some browsers trigger the
                // `change` event before updating the
                // properties of the `<input>` elements.

                setTimeout(function() {

                    // Scan through all the radio inputs to
                    // find which one is now selected.

                    $('#discovery-nav input[type="radio"]').each(function(idx) {

                        if ($(this).is(':checked')) {

                            // Found the selected radio button.
                            // Update the appropriate attribute
                            // on the main navigation control so
                            // that CSS styles can take effect.

                            $('#discovery-nav').attr('data-discovery-nav', idx+1);

                            // Figure out which discovery block
                            // is now active by grabbing the `id`
                            // of the selected article.

                            var hash = $('#discovery-nav ~ article:nth-of-type(' +
                                        (idx+1) + ')').attr('id');

                            // The selected block should now be shown.

                            discovery.show.call(discovery, hash);

                            // Signal a change in navigation.

                            discovery.trigger('navigate', hash);

                        }

                    });

                }, 20);

            });

            return this; // for method chaining

        },

        // The `show` method lets child views know
        // that their view should now be visible.
        // Most child views don't need it, but any
        // with maps will want an event to prompt
        // the user for permisstion to get location.

        show: function(section) {

            switch (section) {

                // For the partners block, we defer
                // showing the content to avoid prompting
                // the user with unneccessary location
                // permission requests. Since the user
                // has navigated here, though, we can
                // defer no longer.

                case 'partners':
                    this.partnerDiscovery.show();
                    break;

            }

        },

        // The `submitSearch` handler responds to
        // the user's submission of a search query.

        submitSearch: function() {

            // When a submit event occurs, we
            // can't handle it entirely within
            // the discovery view (since the
            // result should be a navigation
            // to the search results page).
            // Pass the event "up the chain"
            // to let other code take care of
            // it.

            this.trigger('search:submit');

        }

    });

})();
