/*global Stem, _, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.DiscoveryAsMap = Backbone.View.extend({

        defaults: {
            tint: ''
        },

        initialize: function (options) {

            // Save any options passed to constructor.

            this.options = _.extend({}, this.defaults, options);

            // Set up the custom even handler to deal with
            // browsers that don't handle radio buttons
            // properly (almost all of them).
            // Add markers to the map as they're added
            // to the collection.

            this.listenTo(this.collection, 'add', this.addMarker);

        },

        // Convenience function to calculate a good
        // zoom level based on window size.

        zoom: function () {
            return Math.round($(window).width()/320) + 7;
        },

        render: function () {

            var view = this;

            var width = $(window).width(),
                height = width * 0.4;

            this.$el.css({
                height: height + 'px',
                width:  width  + 'px'
            });

            // Initialize the map.
            var map = L.map(this.el, {
                layers: [L.tileLayer(
                    'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
                    {
                        attribution: '&copy; ' +
                            '<a href="http://openstreetmap.org">OpenStreetMap</a> ' +
                            'Contributors & ' +
                            '<a href="http://stamen.com">Stamen Design</a>',
                        maxZoom: 18
                    }
                )],
                maxBounds: [[35.000659, -85.605165],[30.355757, -80.751429]],
                scrollWheelZoom: false,
            });

            map.on('locationfound', function() {
                map.setZoom(view.zoom());
            });

            map.on('locationerror', function() {
                map.setView([this.model.get('latitude'), this.model.get('longitude')],
                    view.zoom());
            }, this);

            map.locate({setView: true});

            // If a tint is desired, add it.

            if (this.options.tint) {
                L.tileLayer(this.options.tint, {
                    continuousWorld: true,
                    opacity: 0.1,
                    reuseTiles: true,
                    tileSize: 2048,
                }).addTo(map);
            }

            $(window).on('resize', _(function() {
                var width = $(window).width(),
                    height = width * 0.4;
                view.$el.css({
                    height: height + 'px',
                    width:  width  + 'px'
                });
                map.invalidateSize(false);
            }).debounce(250));

            this.map = map;

            this.collection.each(function(marker) {
                this.addMarker(marker);
            }, this);

            return this; // for method chaining
        },

        addMarker: function (marker) {

            if (this.map) {

                var icon = L.divIcon({
                    className: 'fa fa-map-marker poi-marker ' + marker.get('className'),
                    iconAnchor: [20,40],
                    iconSize: [40,40],
                    popupAnchor: [20, -40]
                });

                L.marker([
                    marker.get('latitude'),
                    marker.get('longitude')
                ],{
                    icon: icon
                })
                .bindPopup(new Stem.Views.PoiAsMarker({model: marker}).render().el, {
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
