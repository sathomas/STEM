/*global beforeEach, afterEach, describe, it, sinon, Stem, $ */

describe('TagsAsVerticalSelection View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tags = new Stem.Collections.Tags([
                new Stem.Models.Tag({label: 'subject 1'}),
                new Stem.Models.Tag({label: 'subject 2'})
        ]);
        this.TagsAsVerticalSelectionView = new Stem.Views.TagsAsVerticalSelection({collection: this.Tags,el: this.$Scaffolding});
    });

    afterEach(function() {
        this.TagsAsVerticalSelectionView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagsAsVerticalSelectionView.render().should.equal(this.TagsAsVerticalSelectionView);
    });

    it('should enclose the model views in the view', function() {
        var $el = this.TagsAsVerticalSelectionView.render().$el;
        $el.find('label').length.should.equal(2);
    });


});
