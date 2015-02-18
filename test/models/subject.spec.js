/*global beforeEach, describe, it, Stem */

describe('Subject Model', function () {
    'use strict';

    beforeEach(function () {
        this.SubjectModel = new Stem.Models.Subject();
    });

    it('should default to not selected', function() {
        this.SubjectModel.get('selected').should.be.false();
    });

});
