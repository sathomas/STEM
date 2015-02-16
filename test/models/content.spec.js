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

});
