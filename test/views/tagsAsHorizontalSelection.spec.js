/*global beforeEach, afterEach, describe, it, sinon, Stem, $ */

describe('TagsAsHorizontalSelection View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tags = new Stem.Collections.Tags([
                new Stem.Models.Tag({label: 'subject 1'}),
                new Stem.Models.Tag({label: 'subject 2'})
        ]);
        this.TagsAsHorizontalSelectionView = new Stem.Views.TagsAsHorizontalSelection({collection: this.Tags,el: this.$Scaffolding});
    });

    afterEach(function() {
        this.TagsAsHorizontalSelectionView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagsAsHorizontalSelectionView.render().should.equal(this.TagsAsHorizontalSelectionView);
    });

    it('should enclose the model views in the view', function() {
        var $el = this.TagsAsHorizontalSelectionView.render().$el;
        $el.find('label').length.should.equal(2);
    });


});
