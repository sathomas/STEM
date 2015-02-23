/*global beforeEach, afterEach, describe, it, $, Stem */

describe('GroupsAsFeaturedDetails View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.GroupsAsFeaturedDetailsView = new Stem.Views.GroupsAsFeaturedDetails({
            collection: new Stem.Collections.Groups([
                new Stem.Models.Group({
                    description:  'description 1',
                    displayName:  'displayName 1',
                    profilePath:  '/profile/path/1',
                    thumbnailUrl: '/thumbnail/url/1'
                }),
                new Stem.Models.Group({
                    description:  'description 2',
                    displayName:  'displayName 2',
                    profilePath:  '/profile/path/2',
                    thumbnailUrl: '/thumbnail/url/2'
                 }),
                new Stem.Models.Group({
                    description:  'description 3',
                    displayName:  'displayName 3',
                    profilePath:  '/profile/path/3',
                    thumbnailUrl: '/thumbnail/url/3'
                }),
                new Stem.Models.Group({
                    description:  'description 4',
                    displayName:  'displayName 4',
                    profilePath:  '/profile/path/4',
                    thumbnailUrl: '/thumbnail/url/4'
                }),
                new Stem.Models.Group({
                    description:  'description 5',
                    displayName:  'displayName 5',
                    profilePath:  '/profile/path/5',
                    thumbnailUrl: '/thumbnail/url/5'
                }),
                new Stem.Models.Group({
                    description:  'description 6',
                    displayName:  'displayName 6',
                    profilePath:  '/profile/path/6',
                    thumbnailUrl: '/thumbnail/url/6'
               })
            ]),
            el: this.$Scaffolding
        });
    });

    afterEach(function() {
        this.GroupsAsFeaturedDetailsView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.GroupsAsFeaturedDetailsView.render().should.equal(this.GroupsAsFeaturedDetailsView);
    });

    it('should include a heading for the details list', function() {
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        $el.find('h3').text().should.equal('Selected Groups');
        $el.find('h3').hasClass('featured__details__heading').should.be.true();
    });

    it('should include a views for the (first 5) models', function() {
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        $el.find('.featured__details__listing > *').length.should.equal(5);
        $el.find('a').last().hasClass('button--link').should.be.false();
    });

    it('should include a link to more groups', function() {
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        $el.find('a').last().attr('href').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/search/?types=group');
    });

    it('should load more groups on request', function() {
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        $el.find('a').last().click();
        $el.find('.featured__details__listing > *').length.should.equal(6);
        $el.find('a').last().hasClass('button--link').should.be.true();
    });

    it('should adjust button label with empty collection', function() {
        var emptySet = new Stem.Views.GroupsAsFeaturedDetails({
            collection: new Stem.Collections.Groups()
        });
        var $el = emptySet.render().$el;
        $el.find('a').text().should.equal('Search for more');
        emptySet.remove();
    });

    it('should pass clicks through to href only when local supply of groups is exhausted', function() {
        var bubbledEvents = 0;
        var handler = function() {bubbledEvents++; return false;};
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        this.$Scaffolding.on('click', handler);
        $el.find('a').last().click();
        bubbledEvents.should.equal(0);
        $el.find('a').last().click();
        bubbledEvents.should.equal(1);
    });


});
