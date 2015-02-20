/*global beforeEach, describe, Stem */

describe('Tags Collection', function () {
    'use strict';

    beforeEach(function () {
        this.TagsCollection = new Stem.Collections.Tags([
            new Stem.Models.Tag({label: 'label 1', selected: false}),
            new Stem.Models.Tag({label: 'label 2', selected: true}),
            new Stem.Models.Tag({label: 'label 3', selected: true})
        ]);
    });

    it('should return the set of selected tags', function() {
        this.TagsCollection.getSelectedTags().length.should.equal(2);
        this.TagsCollection.getSelectedTags().should.include('label 2');
        this.TagsCollection.getSelectedTags().should.include('label 3');
    })

});
