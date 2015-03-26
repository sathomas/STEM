/*global describe, it, Stem  */

describe('Group Model', function () {
    'use strict';

    it('should provide the correct API for a full group profile', function() {
        var GroupModel = new Stem.Models.Group({id: 'g:si:mJUHSXeP'});
        GroupModel.url().should.equal(
            Stem.config.oae.protocol + '//' +
            Stem.config.oae.host +
            '/api/group/g:si:mJUHSXeP'
        );
    });

    it('should provide validate resource types', function() {
        var model = new Stem.Models.Group({id: 'g:si:mJUHSXeP'});
        model.set('resourceType', 'user');
        model.isValid().should.be.false();
        model.set('resourceType', 'group');
        model.isValid().should.be.true();
        model.set('resourceType', 'content');
        model.isValid().should.be.false();

    });
    it('should parse response from results and profile', function() {
        new Stem.Models.Group({displayName: 'Name'}, {parse: true}).get('displayName').should.equal('Name');
        new Stem.Models.Group({results: {displayName: 'Name'}}, {parse: true}).get('displayName').should.equal('Name');
        new Stem.Models.Group({profile: {displayName: 'Name'}}, {parse: true}).get('displayName').should.equal('Name');
        new Stem.Models.Group({results: {profile: {displayName: 'Name'}}}, {parse: true}).get('displayName').should.equal('Name');
    });

    it('should supply a default thumbnail', function() {
        new Stem.Models.Group({}, {parse: true}).get('thumbnailUrl').should.not.be.empty();
    });

    it('should promote small picture to stand in for missing thumbnail', function() {
        new Stem.Models.Group({thumbnailUrl: 'URL'}, {parse: true}).get('thumbnailUrl').should.equal('URL');
        new Stem.Models.Group({picture: {small: 'URL'}}, {parse: true}).get('thumbnailUrl').should.equal('URL');
    });

});
