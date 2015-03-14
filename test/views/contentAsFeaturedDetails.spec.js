/*global beforeEach, afterEach, describe, it, $, Stem */

describe('ContentAsFeaturedDetails View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.ContentAsFeaturedDetailsView = new Stem.Views.ContentAsFeaturedDetails({
            collection: new Stem.Collections.Content([
                new Stem.Models.Content({
                    description:  'description 1',
                    displayName:  'displayName 1',
                    profilePath:  '/profile/path/1',
                    thumbnailUrl: '/thumbnail/url/1'
                }),
                new Stem.Models.Content({
                    description:  'description 2',
                    displayName:  'displayName 2',
                    profilePath:  '/profile/path/2',
                    thumbnailUrl: '/thumbnail/url/2'
                 }),
                new Stem.Models.Content({
                    description:  'description 3',
                    displayName:  'displayName 3',
                    profilePath:  '/profile/path/3',
                    thumbnailUrl: '/thumbnail/url/3'
                }),
                new Stem.Models.Content({
                    description:  'description 4',
                    displayName:  'displayName 4',
                    profilePath:  '/profile/path/4',
                    thumbnailUrl: '/thumbnail/url/4'
                }),
                new Stem.Models.Content({
                    description:  'description 5',
                    displayName:  'displayName 5',
                    profilePath:  '/profile/path/5',
                    thumbnailUrl: '/thumbnail/url/5'
                }),
                new Stem.Models.Content({
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
        this.ContentAsFeaturedDetailsView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.ContentAsFeaturedDetailsView.render().should.equal(this.ContentAsFeaturedDetailsView);
    });

    it('should include a heading for the details list', function() {
        var $el = this.ContentAsFeaturedDetailsView.render().$el;
        $el.find('h3').text().should.equal('Selected Content');
        $el.find('h3').hasClass('featured__details__heading').should.be.true();
    });

    it('should include a views for the (first 5) models', function() {
        var $el = this.ContentAsFeaturedDetailsView.render().$el;
        $el.find('.featured__details__listing > *').length.should.equal(5);
        $el.find('a').last().hasClass('button-link').should.be.false();
    });

    it('should include a link to more content', function() {
        var $el = this.ContentAsFeaturedDetailsView.render().$el;
        $el.find('a').last().attr('href').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/search/?types=content');
    });

    it('should load more content on request', function() {
        var $el = this.ContentAsFeaturedDetailsView.render().$el;
        $el.find('a').last().click();
        $el.find('.featured__details__listing > *').length.should.equal(6);
        $el.find('a').last().hasClass('button-link').should.be.true();
    });

    it('should adjust button label with empty collection', function() {
        var emptySet = new Stem.Views.ContentAsFeaturedDetails({
            collection: new Stem.Collections.Content()
        });
        var $el = emptySet.render().$el;
        $el.find('a').text().should.equal('Search for more');
        emptySet.remove();
    });

    it('should pass clicks through to href only when local supply of content is exhausted', function() {
        var bubbledEvents = 0;
        var handler = function() {bubbledEvents++; return false;};
        var $el = this.ContentAsFeaturedDetailsView.render().$el;
        this.$Scaffolding.on('click', handler);
        $el.find('a').last().click();
        bubbledEvents.should.equal(0);
        $el.find('a').last().click();
        bubbledEvents.should.equal(1);
    });

});
