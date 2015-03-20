/*global Stem, Backbone, JST*/

// Backbone view for the partners block of the
// landing page's discovery section. Because
// that section includes some static content
// (to support users without JavaScript), this
// isn't exactly a traditional view. Instead
// of rendering everything from whole cloth
// via a template, we'll surgically update
// pieces of the static page with dynamic
// content.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.PartnersAsDiscovery = Backbone.View.extend({

        initialize: function () {

            // During initialization, create any
            // child views.

            this.proposalsMap = new Stem.Views.DiscoveryAsMap({
                el: $('#partners-donorschoose-map'),
                collection: this.model.proposalPois,
                model: this.model,
                tintUrl: 'images/theme-3-background.png'
            });

        },

        render: function () {

            // Render all the child views.

            this.proposalsMap.render();

            return this; // for method chaining.

        }

    });

})();
