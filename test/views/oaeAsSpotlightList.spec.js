/*global beforeEach, afterEach, describe, it, Stem, $ */

describe('OaeAsSpotlightList View', function () {
    'use strict';

    beforeEach(function () {
        this.OaeAsSpotlightList = new Stem.Views.OaeAsSpotlightList({
            collection: new Stem.Collections.Groups([
                new Stem.Models.Group({
                    description:  'description 1',
                    displayName:  'displayName 1',
                    profilePath:  '/profile/path/1',
                    thumbnailUrl: '/thumbnail/url/1',
                    picture: {
                        medium: '/picture/medium'
                    }
                }),
                new Stem.Models.Group({
                    description:  'description 2',
                    displayName:  'displayName 2',
                    profilePath:  '/profile/path/2',
                    thumbnailUrl: '/thumbnail/url/2',
                    picture: {
                        medium: '/picture/medium'
                    }
                }),
                new Stem.Models.Group({
                    description:  'description 3',
                    displayName:  'displayName 3',
                    profilePath:  '/profile/path/3',
                    thumbnailUrl: '/thumbnail/url/3',
                    picture: {
                        medium: '/picture/medium'
                    }
               })
            ])
        });
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'})
            .appendTo($('body')).append(this.OaeAsSpotlightList.render().$el);
    });

    afterEach(function() {
        this.OaeAsSpotlightList.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsSpotlightList.render().should.equal(this.OaeAsSpotlightList);
    });

    it('should render an unordered list', function() {
        var $el = this.OaeAsSpotlightList.$el;
        $el.prop('tagName').should.equal('UL');
        $el.hasClass('spotlight').should.be.true();
    });

    it('should include items for the models', function() {
        var $el = this.OaeAsSpotlightList.$el;
        $el.find('.spotlight__item').length.should.equal(3);
    });

    it('should initialize all items to collapsed', function() {
        var $el = this.OaeAsSpotlightList.$el;
        $el.find('.spotlight__item[data-expanded="1"]').length.should.equal(0);
    });

    it('should expand a clicked item', function() {
        var $el = this.OaeAsSpotlightList.$el;
        $el.find('.spotlight__item').eq(1).click();
        $el.find('.spotlight__item[data-expanded="1"]').length.should.equal(1);
    });

    it('should expand and then collapse a clicked item', function() {
        var $el = this.OaeAsSpotlightList.$el;
        $el.find('.spotlight__item').eq(1).click();
        $el.find('.spotlight__item').eq(1).click();
        $el.find('.spotlight__item[data-expanded="1"]').length.should.equal(0);
    });

    it('should collapse other items', function() {
        var $el = this.OaeAsSpotlightList.$el;
        $el.find('.spotlight__item').eq(1).click();
        $el.find('.spotlight__item').eq(2).click();
        $el.find('.spotlight__item[data-expanded="1"]').length.should.equal(1);
    });


});
