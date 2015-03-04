/*global beforeEach, describe, it, Stem  */

describe('GroupAsFeaturedDetailsItem View', function () {
    'use strict';

    beforeEach(function () {
        this.Group = new Stem.Models.Group({
            description:  'description',
            displayName:  'displayName',
            profilePath:   '/profile/path',
            thumbnailUrl: '/thumbnail/url'
        });
        this.GroupAsFeaturedDetailsItemView = new Stem.Views.GroupAsFeaturedDetailsItem({model: this.Group});
    });

    it('render method should return the view (for chaining)', function() {
        this.GroupAsFeaturedDetailsItemView.render().should.equal(this.GroupAsFeaturedDetailsItemView);
    });

    it('should render the thumbnail as an <img>', function() {
        var $el = this.GroupAsFeaturedDetailsItemView.render().$el;
        $el.find('img').attr('src').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + this.Group.get('thumbnailUrl'));
    });

    it('should render the title as an <h4> header with appropriate styling class', function() {
        var $el = this.GroupAsFeaturedDetailsItemView.render().$el;
        $el.find('h4').text().should.equal(this.Group.get('displayName'));
        $el.find('h4').hasClass('featured__details__title').should.be.true();
    });

    it('should render the description as the first paragraph', function() {
        var $el = this.GroupAsFeaturedDetailsItemView.render().$el;
        $el.find('p').first().text().should.equal(this.Group.get('description'));
    });

    it('should include a link to the group with appropriate styling classes', function() {
        var $el = this.GroupAsFeaturedDetailsItemView.render().$el;
        $el.find('a').attr('href').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + this.Group.get('profilePath'));
        $el.find('a').hasClass('button button-link').should.be.true();
    });


});
