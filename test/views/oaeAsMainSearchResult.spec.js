/*global beforeEach, describe, it, Stem  */

describe('OaeAsMainSearchResult View', function () {
    'use strict';

    beforeEach(function () {
        this.Group = new Stem.Models.Group({
            description:  'description',
            displayName:  'displayName',
            profilePath:   '/profile/path',
            thumbnailUrl: '/thumbnail/url',
            picture: {
                medium: '/picture/medium'
            }
        });
        this.OaeAsMainSearchResult = new Stem.Views.OaeAsMainSearchResult({model: this.Group});
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsMainSearchResult.render().should.equal(this.OaeAsMainSearchResult);
    });

    it('should render a list item', function() {
        var $el = this.OaeAsMainSearchResult.render().$el;
        $el.prop('tagName').should.equal('LI');
        $el.hasClass('results-main__item').should.be.true();
    });

    it('should render the thumbnail as an <img>', function() {
        var $el = this.OaeAsMainSearchResult.render().$el;
        $el.find('img').attr('src').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + this.Group.get('thumbnailUrl'));
        $el.find('img').hasClass('results-main__thumbnail').should.be.true();
    });

    it('should include a link to the group with appropriate styling classes', function() {
        var $el = this.OaeAsMainSearchResult.render().$el;
        $el.find('a').text().trim().should.equal(this.Group.get('displayName'));
        $el.find('a').attr('href').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + this.Group.get('profilePath'));
        $el.find('a').hasClass('results-main__link').should.be.true();
    });

});
