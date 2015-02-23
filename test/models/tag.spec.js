/*global beforeEach, describe, it, Stem */

describe('Tag Model', function () {
    'use strict';

    beforeEach(function () {
        this.TagModel = new Stem.Models.Tag();
    });

    it('should default to not selected', function() {
        this.TagModel.get('selected').should.be.false();
    });

});
