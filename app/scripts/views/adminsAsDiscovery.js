/*global Stem, _, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.AdminsAsDiscovery = Backbone.View.extend({

        template: JST['app/scripts/templates/adminsAsDiscovery.ejs'],

        tagName: 'article',

        className: 'discovery',

        id: 'admins',

        initialize: function () {
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

            // Create and Render all child views.

            this.certificationsMap = new Stem.Views.PoisAsMap({
                el: this.$el.find('#admins-certifications-map'),
                collection: this.model.get('certificationPois'),
                tintUrl: 'images/theme-2-background.png'
            }).render();

            this.spotlightList = new Stem.Views.OaeAsSpotlightList({
                el: this.$el.find('#admins-spotlights'),
                collection: this.model.get('spotlights')
            }).render();

            // Go ahead and show the map since it's
            // initially visible on tablets and
            // smartphones.

            this.certificationsMap.show();

            return this; // for method chaining.

       }

    });

})();
