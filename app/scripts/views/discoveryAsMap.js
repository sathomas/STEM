/*global Stem, $, _, Backbone, JST*/

// View that displays discovery information as a map.
// Unlike simple views, this view has both a backing
// model and a backing collection. The model provides
// generic information (e.g. default latitude and
// longitude), and the collection contains data for
// a set of point of interest markers.
//
// The mapping itself is mostly handled by the Leafletjs
// library.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.DiscoveryAsMap = Backbone.View.extend({

        // Default options for the view.

        defaults: {
            // Aspect ratio for map
            aspectRatio: 0.4,
            // Attribution for the tiles
            attribution: '&copy; ' +
                '<a href="http://openstreetmap.org">OpenStreetMap</a> ' +
                'Contributors & ' +
                '<a href="http://stamen.com">Stamen Design</a>',
            // Tile layers
            mapTiles: 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
            // Max zoom level supported by the tiles
            maxZoom: 18,
            // 1px solid color file to tint map
            tintUrl:     ''
        },

        // View initialization.

        initialize: function (options) {

            // Save any options passed to constructor.

            this.options = _.extend({}, this.defaults, options);

            // The collection of POI markers may be
            // built incrementally (e.g. from REST
            // API calls). To handle additions to the
            // collection, we hook its `add` event.

            this.listenTo(this.collection, 'add', this.addMarker);

        },

        // Convenience function to calculate a good
        // zoom level based on window size.

        zoom: function () {

            // For now, this is sort of hacked
            // together "by eye." Eventually, it
            // would be good to get some user
            // testing results to see if the
            // calculations are reasonable.

            return Math.round($(window).width()/320) + 7;
        },

        // The render function that creates the
        // map.

        render: function () {

            // Discovery maps are full-width (less
            // any borders), but Leaflet requires
            // explicit dimensions. Grab them from
            // the browser.

            var width = $(window).width(),
                height = width * this.options.aspectRatio;

            // Set the map size explicitly to fill
            // the browser window width.

            this.$el.css({
                height: height + 'px',
                width:  width  + 'px'
            });

            // Initialize the underlying map object.

            this.map = L.map(this.el, {
                layers: [L.tileLayer(this.options.mapTiles, {
                            attribution: this.options.attribution,
                            maxZoom: this.options.maxZoom
                        })],
                maxBounds: [ Stem.config.geo.northwestCorner,
                             Stem.config.geo.southeastCorner ],
                scrollWheelZoom: false,
            });

            // We're going to try to set the initial
            // map location based on the user's
            // current location. Before making the
            // call, we set up simple event handlers
            // to deal with the results.

            // If the user's location is successfully
            // identified, all we need do is set the
            // appropriate zoom level.

            this.map.on('locationfound', function() {
                this.map.setZoom(this.zoom());
            }, this);

            // If we can't get the user's location
            // automatically, we default to the
            // coordinates defined for the model.

            this.map.on('locationerror', function() {
                this.map.setView([
                    this.model.get('latitude'),
                    this.model.get('longitude')
                ],this.zoom());
            }, this);

            // Now we're set up to make the call
            // to request location information
            // from the user.

            this.map.locate({setView: true});

            // While that processing takes place,
            // continue setting up the map.
            // If a tint is desired, add it.

            if (this.options.tintUrl) {
                L.tileLayer(this.options.tintUrl, {
                    continuousWorld: true,
                    opacity: 0.1,
                    reuseTiles: true,
                    tileSize: 2048,
                }).addTo(this.map);
            }

            // Now that the map infrastructure
            // is in place, we can look at the
            // collection of POI markers. If there
            // are any already in the collection,
            // add them to the map.

            this.collection.each(function(marker) {
                this.addMarker(marker);
            }, this);

            // Finally, hook the window resize
            // event so that we can adjust the
            // map size appropriately. We debounce
            // the event since some browsers
            // trigger a flood of `resize`
            // events when the user changes
            // window sizes.

            $(window).on('resize', _.chain(function() {
                var width = $(window).width(),
                    height = width * this.options.aspectRatio;
                this.$el.css({
                    height: height + 'px',
                    width:  width  + 'px'
                });
                this.map.invalidateSize(false);
            }).debounce(250).bind(this).value());

            return this; // for method chaining
        },

        // Add an additional POI marker to the map.

        addMarker: function (marker) {

            // We only process this if the
            // map has been rendered. (If
            // it hasn't, the markers will
            // just collect in the collection
            // until this view is rendered,
            // at which time we'll catch up.

            if (this.map) {

                // Create a simple HTML icon
                // for the marker. The numbers
                // here are (unfortunately)
                // tied pretty tightly to the
                // CSS that styles the markers.

                var icon = L.divIcon({
                    className: 'fa fa-map-marker poi-marker ' +
                                marker.get('className'),
                    iconAnchor: [20,40],
                    iconSize: [40,40],
                    popupAnchor: [20, -40]
                });

                // Create the marker object with
                // appropriate properties and add
                // it to the map.

                L.marker([
                    marker.get('latitude'),
                    marker.get('longitude')
                ],{
                    icon: icon
                })
                .bindPopup(new Stem.Views.PoiAsMarker({
                    model: marker
                }).render().el, {
                    closeButton: false,
                    maxWidth: 250,
                    minWidth: 250,
                    offset: [140, 0]
                })
                .addTo(this.map);

            }

        }

    });

})();
