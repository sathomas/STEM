/*global Stem, describe, it  */

describe('Content Model', function () {

    'use strict';

    it('should provide the correct API for a full content profile', function() {
        var ContentModel = new Stem.Models.Content({id: 'c:si:QkWTIFXev'});
        ContentModel.url().should.equal(
            'https://' +
            Stem.config.oaeHost +
            '/api/content/c:si:QkWTIFXev'
        );
    });

});
