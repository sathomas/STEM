/*global beforeEach, describe, it, Stem  */

describe('OaeAsSpotlightItem View', function () {
    'use strict';

    beforeEach(function () {
        this.Group = new Stem.Models.Group({
            description:  'description',
            displayName:  'displayName',
            profilePath:   '/profile/path',
            thumbnailUrl: 'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png',
            picture: {
                medium: 'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png'
            }
        });
        this.OaeAsSpotlightItem = new Stem.Views.OaeAsSpotlightItem({model: this.Group});
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsSpotlightItem.render().should.equal(this.OaeAsSpotlightItem);
    });

    it('should render a list item', function() {
        var $el = this.OaeAsSpotlightItem.render().$el;
        $el.prop('tagName').should.equal('LI');
        $el.hasClass('spotlight__item').should.be.true();
    });

    it('should render the thumbnail as an <img>', function() {
        var $el = this.OaeAsSpotlightItem.render().$el;
        $el.find('img').attr('src').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + this.Group.get('picture').medium);
        $el.find('img').hasClass('spotlight__item__thumbnail').should.be.true();
    });

    it('should include a link to the group with appropriate styling classes', function() {
        var $el = this.OaeAsSpotlightItem.render().$el;
        $el.find('a').text().trim().should.equal(this.Group.get('displayName'));
        $el.find('a').attr('href').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + this.Group.get('profilePath'));
        $el.find('a').hasClass('spotlight__item__title').should.be.true();
    });

});
