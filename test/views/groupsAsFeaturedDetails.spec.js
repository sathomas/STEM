/*global beforeEach, describe, it, Stem */

describe('GroupsAsFeaturedDetails View', function () {
    'use strict';

    beforeEach(function () {
        this.GroupsAsFeaturedDetailsView = new Stem.Views.GroupsAsFeaturedDetails({
            collection: new Stem.Collections.Groups([
                new Stem.Models.Group({
                    description:  'description 1',
                    displayName:  'displayName 1',
                    profilePath:   '/profile/path/1',
                    thumbnailUrl: '/thumbnail/url/1'
                }),
                new Stem.Models.Group({
                    description:  'description 2',
                    displayName:  'displayName 2',
                    profilePath:   '/profile/path/2',
                    thumbnailUrl: '/thumbnail/url/2'
                })
            ])
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.GroupsAsFeaturedDetailsView.render().should.equal(this.GroupsAsFeaturedDetailsView);
    });

    it('should include a heading for the details list', function() {
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        $el.find('h3').text().should.equal('Selected Groups');
        $el.find('h3').hasClass('featured__details__heading').should.be.true();
    });

    it('should include a views for the models', function() {
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        $el.find('.featured__details__listing > *').length.should.equal(2);
    });

    it('should include a link to more Groups', function() {
        var $el = this.GroupsAsFeaturedDetailsView.render().$el;
        $el.find('a').last().attr('href').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/search/?types=group');
    });

});
