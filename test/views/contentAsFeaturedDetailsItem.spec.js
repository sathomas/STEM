/*global beforeEach, describe, it, Stem  */

describe('ContentAsFeaturedDetailsItem View', function () {
    'use strict';

    beforeEach(function () {
        this.Content = new Stem.Models.Content({
            description:  'description',
            displayName:  'displayName',
            profilePath:   '/profile/path',
            thumbnailUrl: '/thumbnail/url'
        });
        this.ContentAsFeaturedDetailsItemView = new Stem.Views.ContentAsFeaturedDetailsItem({model: this.Content});
    });

    it('render method should return the view (for chaining)', function() {
        this.ContentAsFeaturedDetailsItemView.render().should.equal(this.ContentAsFeaturedDetailsItemView);
    });

    it('should render the thumbnail as an <img>', function() {
        var $el = this.ContentAsFeaturedDetailsItemView.render().$el;
        $el.find('img').attr('src').should.equal('https://' + Stem.config.oaeHost + this.Content.get('thumbnailUrl'));
    });

    it('should render the title as an <h4> header with appropriate styling class', function() {
        var $el = this.ContentAsFeaturedDetailsItemView.render().$el;
        $el.find('h4').text().should.equal(this.Content.get('displayName'));
        $el.find('h4').hasClass('featured__details__title').should.be.true();
    });

    it('should render the description as the first paragraph', function() {
        var $el = this.ContentAsFeaturedDetailsItemView.render().$el;
        $el.find('p').first().text().should.equal(this.Content.get('description'));
    });

    it('should include a link to the project with appropriate styling classes', function() {
        var $el = this.ContentAsFeaturedDetailsItemView.render().$el;
        $el.find('a').attr('href').should.equal('https://' + Stem.config.oaeHost + this.Content.get('profilePath'));
        $el.find('a').hasClass('button button--link').should.be.true();
    });

});
