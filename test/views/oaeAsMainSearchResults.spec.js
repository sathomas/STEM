/*global beforeEach, describe, it, Stem  */

describe('OaeAsMainSearchResults View', function () {
    'use strict';

    beforeEach(function () {
        this.OaeAsMainSearchResults = new Stem.Views.OaeAsMainSearchResults({
            collection: new Stem.Collections.Groups([
                new Stem.Models.Group({
                    description:  'description 1',
                    displayName:  'displayName 1',
                    profilePath:  '/profile/path/1',
                    thumbnailUrl: 'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png'
                }),
                new Stem.Models.Group({
                    description:  'description 2',
                    displayName:  'displayName 2',
                    profilePath:  '/profile/path/2',
                    thumbnailUrl: 'http://www.gatech.edu/sites/all/themes/gt/images/logos/gt-logo-footer.png'
               })
            ])
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsMainSearchResults.render().should.equal(this.OaeAsMainSearchResults);
    });

    it('should render an unordered list', function() {
        var $el = this.OaeAsMainSearchResults.render().$el;
        $el.prop('tagName').should.equal('UL');
        $el.hasClass('results-main__list').should.be.true();
    });

    it('should include list items for the models', function() {
        var $el = this.OaeAsMainSearchResults.render().$el;
        $el.find('li').length.should.equal(2);
    });

});
