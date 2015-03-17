/*global beforeEach, afterEach, describe, Stem, $ */

describe('SearchFiltersAsList View', function () {
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
        this.SearchFilters = new Stem.Collections.SearchFilters([
            new Stem.Models.SearchFilter({
                selected: true,
                tagSet: this.TagSet
            }),
            new Stem.Models.SearchFilter({
                tagSet: this.TagSet
            })
        ]);
        this.SearchFiltersAsList = new Stem.Views.SearchFiltersAsList({
            el: this.$Scaffolding,
            collection: this.SearchFilters
        });
    });

    afterEach(function() {
        this.SearchFilterAsItem.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.SearchFiltersAsList.render().should.equal(this.SearchFiltersAsList);
    });

    it('should render as an unordered list', function() {
        var $el = new Stem.Views.SearchFiltersAsList({
            collection: this.SearchFilters
        }).render().$el;
        $el.prop('tagName').should.be.equal('UL');
        $el.hasClass('results-filter__list').should.be.true();
    });

    it('should provide a common name for all radio inputs', function() {
        var $el = this.SearchFiltersAsList.render().$el;
        var group = false;
        $el.find('input[type="radio"]').length.should.be.at.least(2);
        $el.find('input[type="radio"]').each(function() {
            group = group || $(this).attr('name');
            $(this).attr('name').should.equal(group);
        });
    });

    it('should update underlying models on change events', function(done) {
        var models = this.SearchFilters.models;
        models[0].get('selected').should.be.true();
        models[1].get('selected').should.be.false();
        var $el = this.SearchFiltersAsList.render().$el;
        $el.find('input[type="radio"]').eq(1).click();
        setTimeout(function() {
            models[0].get('selected').should.be.false();
            models[1].get('selected').should.be.true();
            done();
        }, 30);
    });

});
