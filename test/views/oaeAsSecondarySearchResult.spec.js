/*global beforeEach, describe, it, Stem  */

describe('OaeAsSecondarySearchResult View', function () {
    'use strict';

    beforeEach(function () {
        this.Group = new Stem.Models.Group({
            description:  'description',
            displayName:  'displayName',
            profilePath:  '/profile/path',
            thumbnailUrl: 'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png',
            picture: {
                medium: 'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png'
            }
        });
        this.OaeAsSecondarySearchResult = new Stem.Views.OaeAsSecondarySearchResult({model: this.Group});
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsSecondarySearchResult.render().should.equal(this.OaeAsSecondarySearchResult);
    });

    it('should render a list item', function() {
        var $el = this.OaeAsSecondarySearchResult.render().$el;
        $el.prop('tagName').should.equal('LI');
        $el.hasClass('results-secondary__item').should.be.true();
    });

    it('should render the thumbnail as background image', function() {
        var $el = this.OaeAsSecondarySearchResult.render().$el;
        $el.find('div[role="image"]').length.should.equal(1);
        $el.find('div[role="image"]').hasClass('results-secondary__image').should.be.true();
        $el.find('div[role="image"]').attr('style').should.equal('background-image: url(' + this.Group.get('thumbnailUrl') + ');');
    });

    it('should include a link to the group with appropriate styling classes', function() {
        var $el = this.OaeAsSecondarySearchResult.render().$el;
        $el.find('a').text().trim().should.equal(this.Group.get('displayName'));
        $el.find('a').attr('href').should.equal(Stem.config.oae.protocol + '//' + Stem.config.oae.host + this.Group.get('profilePath'));
        $el.find('a').hasClass('results-secondary__link').should.be.true();
    });

});
