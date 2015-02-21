/*global beforeEach, describe, it, Stem */

describe('TagSet Model', function () {
    'use strict';

    beforeEach(function () {
        this.TagSetModel = new Stem.Models.TagSet({
            tags: new Stem.Collections.Tags([
                new Stem.Models.Tag({label: 'label 1', selected: false}),
                new Stem.Models.Tag({label: 'label 2', selected: true}),
                new Stem.Models.Tag({label: 'label 3', selected: true})
            ])
        });
    });

    it('should default title to "Tags"', function() {
        this.TagSetModel.get('title').should.equal('Tags');
    });

    it('should return the set of selected tags', function() {
        this.TagSetModel.getSelectedTags().length.should.equal(2);
        this.TagSetModel.getSelectedTags().should.include('label 2');
        this.TagSetModel.getSelectedTags().should.include('label 3');
    });

});
