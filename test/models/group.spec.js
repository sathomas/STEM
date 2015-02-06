/*global beforeEach, describe, it, Stem  */

describe('Group Model', function () {
    'use strict';

    beforeEach(function () {
        this.GroupModel = new Stem.Models.Group();
    });

    it('should generate the correct URL to access an OAE group', function() {
        this.GroupModel.url.should.equal('https://stemincubator.oaeproject.org/api/group/');
    });
});
