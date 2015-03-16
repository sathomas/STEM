/*global beforeEach, describe, it, Stem  */

describe('OaeAsSecondarySearchResults View', function () {
    'use strict';

    beforeEach(function () {
        this.OaeAsSecondarySearchResults = new Stem.Views.OaeAsSecondarySearchResults({
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
               })
            ])
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsSecondarySearchResults.render().should.equal(this.OaeAsSecondarySearchResults);
    });

    it('should render an unordered list', function() {
        var $el = this.OaeAsSecondarySearchResults.render().$el;
        $el.prop('tagName').should.equal('UL');
        $el.hasClass('results-secondary__list').should.be.true();
    });

    it('should include list items for the models', function() {
        var $el = this.OaeAsSecondarySearchResults.render().$el;
        $el.find('li').length.should.equal(2);
    });

});
