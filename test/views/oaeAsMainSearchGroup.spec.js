/*global beforeEach, describe, it, sinon, $, Stem  */

describe('OaeAsMainSearchGroup View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.collection = new Stem.Collections.Groups([
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
        ]);
        this.group = new Stem.Models.SearchGroup({
            collection: this.collection,
            heading: 'Heading',
            moreLink: '/more/link'
        });
        this.OaeAsMainSearchGroup = new Stem.Views.OaeAsMainSearchGroup({
            el: this.$Scaffolding,
            model: this.group
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.OaeAsMainSearchGroup.render().should.equal(this.OaeAsMainSearchGroup);
    });

    it('should include a heading', function() {
        var $el = this.OaeAsMainSearchGroup.render().$el;
        $el.find('h3').length.should.equal(1);
        $el.find('h3').hasClass('results-main__heading').should.be.true();
    });

    it('should include a list of results', function() {
        var $el = this.OaeAsMainSearchGroup.render().$el;
        $el.find('ul').length.should.equal(1);
        $el.find('li').length.should.equal(2);
    });

    it('should include a more button', function() {
        var $el = this.OaeAsMainSearchGroup.render().$el;
        $el.find('button').length.should.equal(1);
        $el.find('button').hasClass('results-main__button').should.be.true();
    });

    it('should redirect when more button clicked', function() {
        var $el = this.OaeAsMainSearchGroup.render().$el;
        var redirectStub = sinon.stub(Stem.Utils, 'redirect');
        $el.find('button').click();
        redirectStub.calledWith('/more/link').should.be.true();
        redirectStub.restore();
    });

});
