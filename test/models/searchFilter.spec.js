/*global beforeEach, describe, it, assert, expect  */

describe('SearchFilter Model', function () {
    'use strict';

    beforeEach(function () {
        this.SearchFilterModel = new Stem.Models.SearchFilter();
    });

    it('should default to an empty icon', function() {
        this.SearchFilterModel.get('icon').should.equal('');
    });

    it('should default to not selected', function() {
        this.SearchFilterModel.get('selected').should.be.false();
    });

    it('should default to an empty tag set', function() {
        this.SearchFilterModel.get('tagSet').should.be.empty();
    });

    it('should default to an empty title', function() {
        this.SearchFilterModel.get('title').should.equal('');
    });

});
