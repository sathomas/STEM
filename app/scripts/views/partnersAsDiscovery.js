/*global Stem, _, $, Backbone, JST */

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

        template: JST['app/scripts/templates/partnersAsDiscovery.ejs'],

        tagName: 'article',

        className: 'discovery',

        id: 'partners',

        initialize: function () {

            // Build the tag set that controls display of
            // organizations (schools and businesses). Note
            // that we're adding an additional attribute
            // to the Tag models, namely the class of the
            // POI marker corresponding to the tag. We
            // use that class to adjust the visibility
            // of the markers based on how the user
            // interacts with the filters.

            this.tagSet = new Stem.Models.TagSet({
                tags:   new Stem.Collections.Tags([
                            new Stem.Models.Tag({
                                label: 'Schools',
                                selected: true,
                                theme: 'theme-3-light',
                                poiClass: 'poi-school'
                            }),
                            new Stem.Models.Tag({
                                label: 'Businesses',
                                selected: true,
                                theme: 'theme-3',
                                poiClass: 'poi-business'
                            }),
                            new Stem.Models.Tag({
                                label: 'Organizations',
                                selected: true,
                                theme: 'theme-3-dark',
                                poiClass: 'poi-organization'
                            })
                        ]),
                title:  'I’m looking for'
            });

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

            this.mapFilter = new Stem.Views.TagSetAsInlineCheckboxGroup({
                el: this.$el.find('#partners-organizations-filter'),
                model: this.tagSet
            }).render();

            this.organizationsMap = new Stem.Views.PoisAsMap({
                el: this.$el.find('#partners-organizations-map'),
                collection: this.model.get('organizationPois'),
                tintUrl: 'images/theme-3-background.png'
            }).render();

            this.proposalsMap = new Stem.Views.PoisAsMap({
                el: this.$el.find('#partners-donorschoose-map'),
                collection: this.model.get('proposalPois'),
                tintUrl: 'images/theme-3-background.png'
            }).render();

            this.partnershipsList = new Stem.Views.OaeAsSpotlightList({
                el: this.$el.find('#partners-spotlights'),
                collection: this.model.get('partnerships')
            }).render();

            this.listenTo(this.tagSet.get('tags'), 'change', this.updateFilters);

            // Go ahead and show the maps
            // since they'll be visibile right
            // from the start on tablet and
            // smartphone viewports.

            this.proposalsMap.show();
            this.organizationsMap.show();

            return this; // for method chaining.

        },

        updateFilters: function () {

            // If the user changes the selection
            // of one of the tag filters, we
            // update the map to the user's
            // preference. Go through our
            // set of tags to get the selection
            // state of each.

            this.tagSet.get('tags').each(function(tag) {

                // Set the `data-hidden` attribute
                // of the markers appropriately.

                $('#partners-organizations-map')
                    .find('.' + tag.get('poiClass'))
                    .attr('data-hidden',
                        tag.get('selected') ? '0' : '1'
                    );

            });

        }

    });

})();
