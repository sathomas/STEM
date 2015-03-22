/*global Stem, $, Backbone */

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

            this.mapFilter = new Stem.Views.TagSetAsInlineCheckboxGroup({
                el: $('#partners-organizations-filter'),
                model: this.model.tagSet
            });

            this.organizationsMap = new Stem.Views.PoisAsMap({
                el: $('#partners-organizations-map'),
                collection: this.model.organizationPois,
                tintUrl: 'images/theme-3-background.png'
            });

            this.proposalsMap = new Stem.Views.PoisAsMap({
                el: $('#partners-donorschoose-map'),
                collection: this.model.proposalPois,
                tintUrl: 'images/theme-3-background.png'
            });

            this.partnershipsList = new Stem.Views.OaeAsSpotlightList({
                el: $('#partner-spotlights'),
                collection: this.model.partnerships
            });

        },

        render: function () {

            // Render all the child views.

            this.mapFilter.render();
            this.proposalsMap.render();
            this.organizationsMap.render();
            this.partnershipsList.render();

            this.listenTo(this.model.tags, 'change', this.updateFilters);

            return this; // for method chaining.

        },

        updateFilters: function () {

            if (this.model.showBusinesses.get('selected')) {
                $('#partners-organizations-map .poi-business')
                    .removeClass('poi--hidden');
            } else {
                $('#partners-organizations-map .poi-business')
                    .addClass('poi--hidden');
            }

            if (this.model.showSchools.get('selected')) {
                $('#partners-organizations-map .poi-school')
                    .removeClass('poi--hidden');
            } else {
                $('#partners-organizations-map .poi-school')
                    .addClass('poi--hidden');
            }
        },


        show: function () {

            // Show is distinct from render so
            // that we don't annoy the user with
            // unneccessary requests for location
            // permission. It should be called
            // when the view is visible.

            this.proposalsMap.show();
            this.organizationsMap.show();

            return this; // for method chaining.

        }

    });

})();
