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

    it('should parse grade levels from the displayName', function() {
        new Stem.Models.Content({displayName: 'Title - elementary - math'}, {parse: true}).get('elementary').should.be.true();
        new Stem.Models.Content({displayName: 'Title - elementary - math'}, {parse: true}).get('middle').should.be.false();
        new Stem.Models.Content({displayName: 'Title - elementary - math'}, {parse: true}).get('high').should.be.false();
        new Stem.Models.Content({displayName: 'Title - elementary, high - math'}, {parse: true}).get('primary').should.be.false();
        new Stem.Models.Content({displayName: 'Title - elementary, high - math'}, {parse: true}).get('elementary').should.be.true();
        new Stem.Models.Content({displayName: 'Title - elementary, high - math'}, {parse: true}).get('middle').should.be.false();
        new Stem.Models.Content({displayName: 'Title - elementary, high - math'}, {parse: true}).get('high').should.be.true();
        new Stem.Models.Content({displayName: 'Title -  - math'}, {parse: true}).get('primary').should.be.true();
        new Stem.Models.Content({displayName: 'Title -  - math'}, {parse: true}).get('elementary').should.be.true();
        new Stem.Models.Content({displayName: 'Title -  - math'}, {parse: true}).get('middle').should.be.true();
        new Stem.Models.Content({displayName: 'Title -  - math'}, {parse: true}).get('high').should.be.true();
    });

    it('should parse grade levels abbreviations', function() {
        new Stem.Models.Content({displayName: 'Title - K-2 - math'}, {parse: true}).get('primary').should.be.true();
        new Stem.Models.Content({displayName: 'Title - K-2 - math'}, {parse: true}).get('elementary').should.be.false();
        new Stem.Models.Content({displayName: 'Title - 3-5 - math'}, {parse: true}).get('primary').should.be.false();
        new Stem.Models.Content({displayName: 'Title - 3-5 - math'}, {parse: true}).get('elementary').should.be.true();
        new Stem.Models.Content({displayName: 'Title - 6-8 - math'}, {parse: true}).get('middle').should.be.true();
        new Stem.Models.Content({displayName: 'Title - 9-12 - math'}, {parse: true}).get('high').should.be.true();
    });

    it('should parse subjects from the displayName', function() {
        new Stem.Models.Content({displayName: 'Title - elementary - Math'}, {parse: true}).get('tags').should.include('Math');
        new Stem.Models.Content({displayName: 'Title -  - Math, Science'}, {parse: true}).get('tags').should.include('Math');
        new Stem.Models.Content({displayName: 'Title -  - Math, Science'}, {parse: true}).get('tags').should.include('Science');
    });

});
