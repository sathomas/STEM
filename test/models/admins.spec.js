/*global Stem, describe, it  */

describe('Admins Model', function () {

    'use strict';

    it('should be empty (for the time being)', function() {
        var AdminsModel = new Stem.Models.Admins();
        AdminsModel.attributes.should.be.empty();
    });

});
