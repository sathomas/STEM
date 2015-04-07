/*global Stem, describe, beforeEach, it  */

describe('Teachers Model', function () {

    'use strict';

    beforeEach(function () {
        this.TeachersModel = new Stem.Models.Teachers();
    });

    it('should create a search query model if none was provided', function () {
        this.TeachersModel.get('searchQuery').should.not.be.empty();
        this.TeachersModel.get('searchQuery').get('label').should.equal('Search for resources');
        this.TeachersModel.get('searchQuery').get('placeholder').should.equal('Search the Incubator');
    });

    it('should use provided search query model if available', function () {
        var searchQuery = new Stem.Models.Search({ label: 'Label', placeholder: 'Placeholder' });
        var teachersModel = new Stem.Models.Teachers({searchQuery: searchQuery});
        teachersModel.get('searchQuery').should.equal(searchQuery);
        teachersModel.get('searchQuery').get('label').should.equal(searchQuery.get('label'));
        teachersModel.get('searchQuery').get('placeholder').should.equal(searchQuery.get('placeholder'));
    });

});
