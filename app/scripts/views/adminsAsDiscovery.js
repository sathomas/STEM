/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.AdminsAsDiscovery = Backbone.View.extend({

        template: JST['app/scripts/templates/adminsAsDiscovery.ejs'],

        tagName: 'article',

        className: 'discovery',

        id: 'admins',

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

            return this; // for method chaining.
       }

    });

})();
