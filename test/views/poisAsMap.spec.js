/* global beforeEach, describe, it, Stem, L */

describe('View::PoisAsMap', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<div id="test-map" class="map"></div>');
        this.Pois = new Stem.Collections.Pois();

        this.PoisAsMap = new Stem.Views.PoisAsMap({
            el: this.$Scaffolding,
            collection: this.Pois,
            tintUrl: ''
        });

        Stem.user.geo = {};
    });

    describe('PoisAsMap View: Initialization', function() {
        it('render method should return the view', function() {
            this.PoisAsMap.render().should.equal(this.PoisAsMap);
        });

        // Show method should check if rendering has occured??
        it ('post-render: show method should return the view', function() {
            this.PoisAsMap.render().show().should.equal(this.PoisAsMap);
        });

        it('post-render: source element should have class applied by Leaflet library', function() {
            var $el = this.PoisAsMap.render().$el;
            $el.hasClass('leaflet-container').should.be.true();
        });

        it('post-render: a reference to the Leaflet structure should exist in a data attribute on the source element', function() {
            var $el = this.PoisAsMap.render().$el;
            $el.data('map').should.equal(this.PoisAsMap.map);
        });

        it('post-render: if no aspect ratio is not provided on initialization, should be 0.5', function() {
            var $el = this.PoisAsMap.render().$el;
            $el.data('aspectRatio').should.equal(0.5);
        });
    });

    describe('PoisAsMap View: Map Markers', function() {
        it('if a Poi is added to a Pois collection, PoisAsMap should be see the event.', function() {
            var $el = this.PoisAsMap.render().$el;
            var handler = sinon.spy();

            this.Pois.on('add', handler);
            this.Pois.add(new Stem.Models.Poi());
            handler.callCount.should.equal(1);
            this.Pois.off('add', handler);
        });

        it('adding a Poi to a Pois collection should also update the PoisAsMap view.', function() {
            Stem.user.geo = _.clone(Stem.config.geo);
            var $el = this.PoisAsMap.render().$el;

            this.Pois.add(new Stem.Models.Poi());
            this.PoisAsMap.show();

            // There should be a marker in the PoisAsMap DOM.
            $el.find('.leaflet-marker-pane > .poi-marker').length.should.equal(1);
        });

        it('initialization with markers should immediately add them to the map', function() {
            Stem.user.geo = _.clone(Stem.config.geo);
            this.Pois.add(new Stem.Models.Poi());
            var $el = this.PoisAsMap.render().$el;
            this.PoisAsMap.show();

            // There should be a marker in the PoisAsMap DOM.
            $el.find('.leaflet-marker-pane > .poi-marker').length.should.equal(1);
        });
    });

    describe('PoisAsMap View: setView Function', function() {
        it('post-render: Providing setView with a location out of state bounds, should set the map view to the Stem config default.', function() {
            var view = this.PoisAsMap.render();
            view.setView(0, 0);

            var latlng = view.map.getCenter();
            latlng.lat.should.equal(Stem.config.geo.latitude);
            latlng.lng.should.equal(Stem.config.geo.longitude);
        });

        it('post-render: Providing setView with a location within state bounds, should set the map view to the provided coordinates.', function() {
            var view = this.PoisAsMap.render();
            var test_location = { lat: 32.6781248, lng: -83.223252 } // Google Maps output for "Georgia".
            view.setView(test_location.lat, test_location.lng);

            var latlng = view.map.getCenter();
            latlng.lat.should.equal(test_location.lat);
            latlng.lng.should.equal(test_location.lng);
        });
    });

    describe('PoisAsMap View: Location Services', function() {
        it('post-show: When a locationfound event occurs, PoisAsMap should save the location for other maps to use later.', function() {
            var view = this.PoisAsMap.render().show();

            view.map.fire('locationfound', {
                latlng: { lat: 0, lng: 0 }
            });

            Stem.user.geo.latitude.should.equal(0);
            Stem.user.geo.longitude.should.equal(0);
        });

        it('post-show: If this browser provides a location out of state boundaries, set the view to the Stem config default.', function() {
            var view = this.PoisAsMap.render().show();

            var test_location = { lat: 0, lng: 0 }; // A random point out of state boundaries.
            view.map.fire('locationfound', { latlng: test_location });

            var latlng = view.map.getCenter();
            latlng.lat.should.equal(Stem.config.geo.latitude);
            latlng.lng.should.equal(Stem.config.geo.longitude);
        });

        it('post-show: If the browser provides a location in state boundaries, set the view to the provided location.', function() {
            var view = this.PoisAsMap.render().show();

            var test_location = { lat: 32.6781248, lng: -83.223252 }; // Google Maps result for typing 'Georgia'
            view.map.fire('locationfound', { latlng: test_location });

            var latlng = view.map.getCenter();
            latlng.lat.should.equal(test_location.lat);
            latlng.lng.should.equal(test_location.lng);
        });

        it('post-render: If the browser encounters an error acquiring the location, yet user coordinates are cached locally,\
            set the view to cached values.', function() {
            Stem.user.geo = _.clone(Stem.config.geo);
            var view = this.PoisAsMap.render().show();

            view.map.fire('locationerror');

            var latlng = view.map.getCenter();
            latlng.lat.should.equal(Stem.user.geo.latitude);
            latlng.lng.should.equal(Stem.user.geo.longitude);
        });

        it('post-render: If the browser encounters an error acquiring the location, and user coordinates are not cached,\
            and attempting to get location by ip is successful, call setView with the response.', function() {
            var server = sinon.fakeServer.create();
            var spy = sinon.spy(this.PoisAsMap, 'setView');
            var view = this.PoisAsMap.render().show();

            view.map.fire('locationerror');
            server.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({
                loc: '0, 0'
            }));
            spy.callCount.should.equal(1);
            spy.calledWith(0, 0).should.be.true();

            spy.restore();
            server.restore();
        });

        it('post-render: If the browser encounters an error acquiring the location, and user coordinates are not cached,\
            and attempting to get location by ip fails, call setView with the Stem defaults.', function() {
            var server = sinon.fakeServer.create();
            var spy = sinon.spy(this.PoisAsMap, 'setView');
            var view = this.PoisAsMap.render().show();

            view.map.fire('locationerror');
            server.requests[0].respond(404);
            spy.callCount.should.equal(1);
            spy.calledWith(Stem.config.geo.latitude, Stem.config.geo.longitude).should.be.true();

            spy.restore();
            server.restore();
        });

        it('post-render: If the browser encounters an error acquiring the location, and user coordinates are not cached,\
            and the browser does not allow a locationerror event to be fired, call locationFailed manually.', function() {
            var spy = sinon.spy(this.PoisAsMap, "locationFailed");
            var clock = sinon.useFakeTimers();
            var view = this.PoisAsMap.render().show();
            // instead of firing a locationerror from the Leaflet map, do nothing.
            clock.tick(8000); // wait for the necessary time period to elapse

            spy.callCount.should.equal(1);

            clock.restore();
            spy.restore();
        });
    });
});