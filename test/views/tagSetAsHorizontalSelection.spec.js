/*global beforeEach, afterEach, describe, it, sinon, Stem, $ */

describe('TagSetAsHorizontalSelection View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tags = new Stem.Collections.Tags([
                new Stem.Models.Tag({label: 'subject 1'}),
                new Stem.Models.Tag({label: 'subject 2'})
        ]);
        this.TagSet = new Stem.Models.TagSet({
            tags: this.Tags,
            title: 'title'
        })
        this.TagSetAsHorizontalSelectionView = new Stem.Views.TagSetAsHorizontalSelection({
            model: this.TagSet,
            el: this.$Scaffolding
        });
    });

    afterEach(function() {
        this.TagSetAsHorizontalSelectionView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagSetAsHorizontalSelectionView.render().should.equal(this.TagSetAsHorizontalSelectionView);
    });

    it('should enclose the subjects in a form', function() {
        var $el = this.TagSetAsHorizontalSelectionView.render().$el;
        $el.find('form').hasClass('horizontal-selection').should.be.true();
    });

    it('should add a label for the fieldset', function() {
        var $el = this.TagSetAsHorizontalSelectionView.render().$el;
        $el.find('fieldset > label').first().hasClass('horizontal-selection__label').should.be.true();
        $el.find('fieldset > label').first().text().should.equal('title:');
    });

    it('should enclose the model views in the fieldset', function() {
        var $el = this.TagSetAsHorizontalSelectionView.render().$el;
        $el.find('fieldset label:not(.horizontal-selection__label)').length.should.equal(2);
    });

});
