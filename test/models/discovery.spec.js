/*global Stem, describe, beforeEach, it  */

describe('Discovery Model', function () {

    'use strict';

    beforeEach(function () {
        this.DiscoveryModel = new Stem.Models.Discovery();
    });

    it('should create a search query model if none was provided', function () {
        this.DiscoveryModel.get('searchQuery').should.not.be.empty();
        this.DiscoveryModel.get('searchQuery').get('label').should.equal('Search for resources');
        this.DiscoveryModel.get('searchQuery').get('placeholder').should.equal('Search the Incubator');
    });

    it('should use provided search query model if available', function () {
        var searchQuery = new Stem.Models.Search({ label: 'Label', placeholder: 'Placeholder' });
        var discoveryModel = new Stem.Models.Discovery({searchQuery: searchQuery});
        discoveryModel.get('searchQuery').should.equal(searchQuery);
        discoveryModel.get('searchQuery').get('label').should.equal(searchQuery.get('label'));
        discoveryModel.get('searchQuery').get('placeholder').should.equal(searchQuery.get('placeholder'));
    });

    it('should pass search query model to child views', function () {
        var searchQuery = new Stem.Models.Search({ label: 'Label', placeholder: 'Placeholder' });
        var discoveryModel = new Stem.Models.Discovery({searchQuery: searchQuery});
        discoveryModel.get('teachers').get('searchQuery').should.equal(searchQuery);
        discoveryModel.get('admins').get('searchQuery').should.equal(searchQuery);
        discoveryModel.get('partners').get('searchQuery').should.equal(searchQuery);
    });

    it('should update search query model in child views', function () {
        var searchQuery = new Stem.Models.Search({ label: 'Label', placeholder: 'Placeholder' });
        this.DiscoveryModel.set('searchQuery',searchQuery);
        this.DiscoveryModel.get('searchQuery').should.equal(searchQuery);
        this.DiscoveryModel.get('teachers').get('searchQuery').should.equal(searchQuery);
        this.DiscoveryModel.get('admins').get('searchQuery').should.equal(searchQuery);
        this.DiscoveryModel.get('partners').get('searchQuery').should.equal(searchQuery);
    });

});
