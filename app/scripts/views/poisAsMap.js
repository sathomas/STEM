/*global Stem, $, _, Backbone, L */

// View that displays discovery information as a map.
// The collection backing this view contains data for
// a set of point of interest markers.
//
// The mapping itself is mostly handled by the Leafletjs
// library.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.PoisAsMap = Backbone.View.extend({

        // Default options for the view.

        defaults: {
            // Aspect ratio for map
            aspectRatio: 0.5,
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

        calcZoom: function () {

            // For now, this is sort of hacked
            // together "by eye." Eventually, it
            // would be good to get some user
            // testing results to better match
            // initial zoom levels with
            // `$(window).width()`

            return 10;

        },

        // Convenience function to set the view
        // for the map. Parameters are latitude
        // and longitude of the user.

        setView: function (lat, lng) {

            // See if the user's latitude and
            // longitude are (more or less)
            // within the state boundary. If
            // they're not, we don't want to
            // rely on the user location to
            // set the map view.

            var minLat = Stem.config.geo.southeastCorner[0],
                maxLat = Stem.config.geo.northwestCorner[0],
                minLng = Stem.config.geo.northwestCorner[1],
                maxLng = Stem.config.geo.southeastCorner[1],
                rangeLat = maxLat - minLat,
                rangeLng = maxLng - minLng;

            if ( (lat > (minLat - rangeLat/2)) &&
                 (lat < (maxLat + rangeLat/2)) &&
                 (lng > (minLng - rangeLng/2)) &&
                 (lng < (maxLng + rangeLng/2)) ) {

                this.map.setView(
                    [lat,lng],
                    this.calcZoom()
                );

            } else {

                // If the user isn't located near
                // the state, use the defaults
                // for the map view.

                this.map.setView([
                        Stem.config.geo.latitude,
                        Stem.config.geo.longitude
                    ],
                    this.calcZoom()
                );

            }

        },

        // The render function that creates the
        // map. There's a separate function to
        // actually show the map. That separation
        // lets us prepare the DOM for the map
        // during the render phase but hold off
        // on the final step until it's necessary.
        // The final step hits the browser's location
        // services API which throws a permissions
        // prompt to the user. We'd like to avoid
        // the permisssions prompt until we're absolutely
        // sure the user is going to see the map.

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

        // Function to show the map to the user.
        // This function may cause the browser to
        // throw a permission prompt to the user
        // (for location information), so it's
        // best to avoid it unless we're sure
        // that the map is actually visible.

        show: function () {

            // Use a closure variable to keep track
            // of whether we've found the location
            // or not.

            var locationFound = false;

            // We're going to try to set the initial
            // map location based on the user's
            // current location. The first thing to
            // check is whether or not that information
            // is already available and cached.

            if (Stem.user.geo.latitude && Stem.user.geo.longitude) {
                this.setView(
                    Stem.user.geo.latitude,
                    Stem.user.geo.longitude
                );
            }

            // Okay, the geo-location info isn't
            // conveniently available already, so we'll
            // try to set it automatically using the
            // browser's location services. Before making
            // the API call, we set up simple event handlers
            // to deal with the results.

            this.map.on('locationfound', function(ev) {

                // Set the map view.

                this.setView(ev.latlng.lat, ev.latlng.lng);

                // If we successfully get the location,
                // save it for other maps to use.

                Stem.user.geo.latitude = ev.latlng.lat;
                Stem.user.geo.longitude = ev.latlng.lng;

                // Note that we've found it.

                locationFound = true;


            }, this).on('locationerror', this.locationFailed, this);

            // Now we're set up to make the call
            // to request location information
            // from the user.

            this.map.locate({
                maximumAge: 60*60*1000, // Cached info is okay
                setView:    false
            });

            // Unfortunately, some browers allow
            // location permission requests to
            // fail silently (without returning
            // an error) if, e.g., the user simply
            // dismisses the dialog box without
            // indicating a preference. To deal
            // with that case, we have to add our
            // own explicit timeout.

            _.chain(function() {

                // Once the delay has passed, check
                // to see if we have a location.

                if (!locationFound ||
                    !Stem.user.geo.latitude ||
                    !Stem.user.geo.longitude) {

                    // Nope. Resort to fallback.

                    this.locationFailed();

                }

            }).bind(this).delay(8*1000);

            return this; // for method chaining

        },

        // Handle case when browser geolocation fails.

        locationFailed: function () {

            // We may have gotten here because of
            // a race condition in Leaflet with
            // some browsers. If that's the
            // case, we can still set the view.

            if (Stem.user.geo.latitude &&
                Stem.user.geo.longitude) {

                this.setView(
                    Stem.user.geo.latitude,
                    Stem.user.geo.longitude
                );

            } else {

                // Bummer. We couldn't get the location
                // information from the browser directly.
                // As a backup, let's try using the
                // client's public IP address.

                Stem.Utils.getLocationFromIp(
                    _(function(LatLong) {

                        // Success. Set the map view.

                        this.setView(LatLong[0],LatLong[1]);

                    }).bind(this),
                    _(function() {

                        // Okay. That didn't work either.
                        // Only option left is resorting
                        // to default values.

                        this.setView(
                            Stem.config.geo.latitude,
                            Stem.config.geo.longitude
                        );

                    }).bind(this)

                );

            }

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
