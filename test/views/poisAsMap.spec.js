/* global beforeEach, describe, it, Stem, L */

describe('PoisAsMap View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<div id="test-certifications-map"></div>');
        this.Pois = new Stem.Collections.Pois();

        this.PoisAsMap = new Stem.Views.PoisAsMap({
            $el: this.$Scaffolding,
            collection: this.Pois
        });
    });

    it('render methods should return the view', function() {
        this.PoisAsMap.render().should.equal(this.PoisAsMap);
    });

    it('after render, a reference to the Leaflet structure should exist in a data attribute on the source element', function() {
        var $el = this.PoisAsMap.render().$el;
        $el.data('map').should.equal(this.PoisAsMap.map);
    });

    it('after render, if no aspect ratio is not provided on initialization, should be 0.5', function() {
        var $el = this.PoisAsMap.render().$el;
        $el.data('aspectRatio').should.equal(0.5);
    });

    it('if the add event is fired from Pois collection, addMarker should be called for PoisAsMap', function() {
        var handler = sinon.spy();
        this.Pois.on('add', handler);
        this.Pois.off('add', handler);
    });
});