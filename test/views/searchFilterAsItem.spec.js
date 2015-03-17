/*global beforeEach, afterEach, describe, it, Stem, $ */

describe('SearchFilterAsItem View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tags = new Stem.Collections.Tags([
            new Stem.Models.Tag({label: 'tag 1'}),
            new Stem.Models.Tag({label: 'tag 2'})
        ]);
        this.TagSet = new Stem.Models.TagSet({
            tags: this.Tags,
            title: 'tags'
        });
        this.SearchFilter = new Stem.Models.SearchFilter({
            icon: 'icon',
            selected: false,
            tagSet: this.TagSet,
            title: 'filter'
        });
        this.SearchFilterAsItem = new Stem.Views.SearchFilterAsItem({
            el: this.$Scaffolding,
            groupId: 'group',
            model: this.SearchFilter
        });
    });

    afterEach(function() {
        this.SearchFilterAsItem.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.SearchFilterAsItem.render().should.equal(this.SearchFilterAsItem);
    });

    it('should render as a list item', function() {
        var $el = new Stem.Views.SearchFilterAsItem({
            model: new Stem.Models.SearchFilter({ tagSet: this.TagSet })
        }).render().$el;
        $el.prop('tagName').should.be.equal('LI');
        $el.hasClass('results-filter__list-item').should.be.true();
    });

    it('should create a radio input for the item', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('input[type="radio"]').length.should.equal(1);
        $el.find('input[type="radio"]').hasClass('results-filter__list-item__input').should.be.true(1);
    });

    it('should set the group name for the radio input', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('input[type="radio"]').attr('name').should.equal('group');
    });

    it('should set checked property appropriately for the radio input', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('input[type="radio"]').prop('checked').should.be.false();
        var item = new Stem.Views.SearchFilterAsItem({
            model: new Stem.Models.SearchFilter({ selected: true, tagSet: this.TagSet })
        }).render().$el.find('input[type="radio"]').prop('checked').should.be.true();
    });

    it('should create a label for the item', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('label.results-filter__list-item__label').length.should.equal(1);
    });

    it('should match the label and the radio input', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('label.results-filter__list-item__label').attr('for').should.equal($el.find('input[type="radio"]').attr('id'));
    });

    it('should include an icon in the label', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('label.results-filter__list-item__label i.results-filter__list-item__icon').hasClass('icon').should.be.true();
    });

    it('should set the label text to the filter title', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('label.results-filter__list-item__label').text().trim().should.equal(this.SearchFilter.get('title').trim());
    });

    it('should update model on view change', function() {
        var $el = this.SearchFilterAsItem.render().$el;
        $el.find('input[type="radio"]').click();
        this.SearchFilterAsItem.trigger('groupChange');
        this.SearchFilter.get('selected').should.be.true();
    });

});
