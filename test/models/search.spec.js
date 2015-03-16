/*global beforeEach, describe, it, Stem */

describe('Search Model', function () {
    'use strict';

    beforeEach(function () {
        this.SearchModel = new Stem.Models.Search();
    });

    it('should default to an empty label', function() {
        this.SearchModel.get('label').should.equal('');
    });

    it('should default to an empty placeholder', function() {
        this.SearchModel.get('placeholder').should.equal('');
    });

    it('should default to an empty short placeholder', function() {
        this.SearchModel.get('shortPlaceholder').should.equal('');
    });

    it('should default to an empty query', function() {
        this.SearchModel.get('query').should.equal('');
    });

});
