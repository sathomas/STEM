/* global beforeEach, describe, it, Stem, L */

describe('PoisAsMap View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<div id="test-map" class="map"></div>');
        this.Pois = new Stem.Collections.Pois();

        this.PoisAsMap = new Stem.Views.PoisAsMap({
            el: this.$Scaffolding,
            collection: this.Pois,
            tintUrl: ''
        });
    });

    it('render method should return the view', function() {
        this.PoisAsMap.render().should.equal(this.PoisAsMap);
    });

    // Show method should check if rendering has occured??
    it ('after render, show method should return the view', function() {
        this.PoisAsMap.render().show().should.equal(this.PoisAsMap);
    });

    it('after render, source element should have class applied by Leaflet library', function() {
        var $el = this.PoisAsMap.render().$el;
        $el.hasClass('leaflet-container').should.be.true();
    });

    it('after render, a reference to the Leaflet structure should exist in a data attribute on the source element', function() {
        var $el = this.PoisAsMap.render().$el;
        $el.data('map').should.equal(this.PoisAsMap.map);
    });

    it('after render, if no aspect ratio is not provided on initialization, should be 0.5', function() {
        var $el = this.PoisAsMap.render().$el;
        $el.data('aspectRatio').should.equal(0.5);
    });

    it('if a Poi is added to a Pois collection, PoisAsMap should be see the event.', function() {
        var $el = this.PoisAsMap.render().$el;
        var handler = sinon.spy();

        this.Pois.on('add', handler);
        this.Pois.add(new Stem.Models.Poi());
        handler.callCount.should.equal(1);
        this.Pois.off('add', handler);
    });

    it('adding a Poi to a Pois collection should also update the PoisAsMap view.', function() {
        Stem.user.geo = _.clone(Stem.config.geo); // Rather than deal with browser location services or async ops.
        var $el = this.PoisAsMap.render().$el;

        this.Pois.add(new Stem.Models.Poi());
        this.PoisAsMap.show();

        // There should be a marker in the PoisAsMap DOM.
        $el.find('.leaflet-marker-pane > .poi-marker').length.should.equal(1);
    });

    it('initialization with markers should immediately add them to the map', function() {
        this.Pois.add(new Stem.Models.Poi());
        var $el = this.PoisAsMap.render().$el;
        this.PoisAsMap.show();

        // There should be a marker in the PoisAsMap DOM.
        $el.find('.leaflet-marker-pane > .poi-marker').length.should.equal(1);
    });
});