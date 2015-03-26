/*global Stem, describe, it  */

describe('Content Model', function () {

    'use strict';

    it('should provide the correct API for a full content profile', function() {
        var ContentModel = new Stem.Models.Content({id: 'c:si:QkWTIFXev'});
        ContentModel.url().should.equal(
            Stem.config.oae.protocol + '//' +
            Stem.config.oae.host +
            '/api/content/c:si:QkWTIFXev'
        );
    });

    it('should parse response from results and profile', function() {
        new Stem.Models.Content({displayName: 'Name'}, {parse: true}).get('displayName').should.equal('Name');
        new Stem.Models.Content({results: {displayName: 'Name'}}, {parse: true}).get('displayName').should.equal('Name');
        new Stem.Models.Content({profile: {displayName: 'Name'}}, {parse: true}).get('displayName').should.equal('Name');
        new Stem.Models.Content({results: {profile: {displayName: 'Name'}}}, {parse: true}).get('displayName').should.equal('Name');
    });

    it('should promote small picture to stand in for missing thumbnail', function() {
        new Stem.Models.Content({}, {parse: true}).get('thumbnailUrl').should.equal('');
        new Stem.Models.Content({thumbnailUrl: 'URL'}, {parse: true}).get('thumbnailUrl').should.equal('URL');
        new Stem.Models.Content({picture: {small: 'URL'}}, {parse: true}).get('thumbnailUrl').should.equal('URL');
    });

});
