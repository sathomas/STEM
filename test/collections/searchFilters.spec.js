/*global beforeEach, describe, Stem */

describe('SearchFilters Collection', function () {
    'use strict';

    beforeEach(function () {
        this.SearchFiltersCollection = new Stem.Collections.SearchFilters([
            new Stem.Models.SearchFilter({title: 'filter 1'}),
            new Stem.Models.SearchFilter({title: 'filter 2', selected: true}),
            new Stem.Models.SearchFilter({title: 'filter 3'}),
        ]);
    });

    it('should store multiple filters', function() {
        this.SearchFiltersCollection.length.should.equal(3);
    });

    it('should clear other filters when a new one is selected', function() {
        this.SearchFiltersCollection.at(2).set('selected',true);
        this.SearchFiltersCollection.at(0).get('selected').should.be.false();
        this.SearchFiltersCollection.at(1).get('selected').should.be.false();
        this.SearchFiltersCollection.at(2).get('selected').should.be.true();
    });

    it('should not change other filters when selected is de-selected', function() {
        this.SearchFiltersCollection.at(1).set('selected',false);
        this.SearchFiltersCollection.at(0).get('selected').should.be.false();
        this.SearchFiltersCollection.at(1).get('selected').should.be.false();
        this.SearchFiltersCollection.at(2).get('selected').should.be.false();
    });

});
