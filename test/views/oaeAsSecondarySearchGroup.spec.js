/*global beforeEach, describe, it, sinon, Stem, $  */

describe('OaeAsSecondarySearchGroup View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.collection = new Stem.Collections.Groups([
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
           })
        ]);
        this.group = new Stem.Models.SearchGroup({
            collection: this.collection,
            heading: 'Heading',
            moreLink: '/more/link'
        });
        this.OaeAsSecondarySearchGroup = new Stem.Views.OaeAsSecondarySearchGroup({
            el: this.$Scaffolding,
            model: this.group
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsSecondarySearchGroup.render().should.equal(this.OaeAsSecondarySearchGroup);
    });

    it('should include a heading', function() {
        var $el = this.OaeAsSecondarySearchGroup.render().$el;
        $el.find('h4').length.should.equal(1);
        $el.find('h4').hasClass('results-secondary__heading').should.be.true();
    });

    it('should include a list of results', function() {
        var $el = this.OaeAsSecondarySearchGroup.render().$el;
        $el.find('ul').length.should.equal(1);
        $el.find('li').length.should.equal(5);
    });

    it('should mark excess results as extra', function() {
        var $el = this.OaeAsSecondarySearchGroup.render().$el;
        $el.find('li.results-secondary__item--extra').length.should.equal(3);
    });

    it('should include a more button', function() {
        var $el = this.OaeAsSecondarySearchGroup.render().$el;
        $el.find('.results-secondary__more button').length.should.equal(1);
        $el.find('.results-secondary__more button').hasClass('btn').should.be.true();
    });

    it('should include an extras button', function() {
        var $el = this.OaeAsSecondarySearchGroup.render().$el;
        $el.find('.results-secondary__extras button').length.should.equal(1);
        $el.find('.results-secondary__extras button').hasClass('btn').should.be.true();
    });

    it('should redirect when more button clicked', function() {
        var $el = this.OaeAsSecondarySearchGroup.render().$el;
        var redirectStub = sinon.stub(Stem.Utils, 'redirect');
        $el.find('button').click();
        redirectStub.calledWith('/more/link').should.be.true();
        redirectStub.restore();
    });

});
