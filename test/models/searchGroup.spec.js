/*global beforeEach, describe, it, Stem */

describe('SearchGroup Model', function () {
    'use strict';

    beforeEach(function () {
        this.SearchGroupModel = new Stem.Models.SearchGroup();
    });

    it('should default to an empty heading', function() {
        this.SearchGroupModel.get('heading').should.equal('');
    });

    it('should default to an empty collection', function() {
        this.SearchGroupModel.get('collection').length.should.equal(0);
    });

    it('should default to an empty link', function() {
        this.SearchGroupModel.get('moreLink').should.equal('');
    });

});
