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

    it('should parse grade levels from the displayName', function() {
        new Stem.Models.Group({displayName: 'Title - elementary - math'}, {parse: true}).get('elementary').should.be.true();
        new Stem.Models.Group({displayName: 'Title - elementary - math'}, {parse: true}).get('middle').should.be.false();
        new Stem.Models.Group({displayName: 'Title - elementary - math'}, {parse: true}).get('high').should.be.false();
        new Stem.Models.Group({displayName: 'Title - elementary, high - math'}, {parse: true}).get('elementary').should.be.true();
        new Stem.Models.Group({displayName: 'Title - elementary, high - math'}, {parse: true}).get('middle').should.be.false();
        new Stem.Models.Group({displayName: 'Title - elementary, high - math'}, {parse: true}).get('high').should.be.true();
        new Stem.Models.Group({displayName: 'Title -  - math'}, {parse: true}).get('elementary').should.be.true();
        new Stem.Models.Group({displayName: 'Title -  - math'}, {parse: true}).get('middle').should.be.true();
        new Stem.Models.Group({displayName: 'Title -  - math'}, {parse: true}).get('high').should.be.true();
    });

    it('should parse subjects from the displayName', function() {
        new Stem.Models.Group({displayName: 'Title - elementary - Math'}, {parse: true}).get('tags').should.include('Math');
        new Stem.Models.Group({displayName: 'Title -  - Math, Science'}, {parse: true}).get('tags').should.include('Math');
        new Stem.Models.Group({displayName: 'Title -  - Math, Science'}, {parse: true}).get('tags').should.include('Science');
    });

});
