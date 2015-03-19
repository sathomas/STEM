/*global beforeEach, describe, it  */

describe('Poi Model', function () {
    'use strict';

    beforeEach(function () {
        this.PoiModel = new Stem.Models.Poi();
    });

    it('should default to an empty class name', function() {
        this.PoiModel.get('className').should.equal('');
    });

    it('should default to an empty image URL', function() {
        this.PoiModel.get('imageUrl').should.equal('');
    });

    it('should default to an empty link URL', function() {
        this.PoiModel.get('link').should.equal('');
    });

    it('should default to configured geographic coordinates', function() {
        this.PoiModel.get('latitude').should.equal(Stem.config.geo.latitude);
        this.PoiModel.get('longitude').should.equal(Stem.config.geo.longitude);
    });

});
