/*global beforeEach, describe, Stem */

describe('Pois Collection', function () {
    'use strict';

    beforeEach(function () {
        this.PoisCollection = new Stem.Collections.Pois([
            new Stem.Models.Poi(),
            new Stem.Models.Poi(),
        ]);
    });

    it('should store multiple points of interest', function() {
        this.PoisCollection.length.should.equal(2);
    });

});
