/*global Stem, _, $, Backbone */

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

        initialize: function () {

            // Set up the different child views.

            this.partnerDiscovery = new Stem.Views.PartnersAsDiscovery({
                model: this.model.get('partners')
            });

        },

        render: function () {

            // Render the child views.

            this.partnerDiscovery.render();

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

        }

    });

})();
