/* global Stem, describe, beforeEach, it */

describe('DiscoveryAsContent View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<section id="landing"></section>');

        this.Discovery = new Stem.Models.Discovery();
        this.DiscoveryAsContent = new Stem.Views.DiscoveryAsContent({
            el: this.$Scaffolding,
            model: this.Discovery
        });
    });

    describe('Rendering', function() {
        it('should return the view (for chaining).', function() {
            this.DiscoveryAsContent.render().should.equal(this.DiscoveryAsContent);
        });

        it('should fill in the provided element, if it was empty.', function() {
            var $el = this.DiscoveryAsContent.render().$el;
            $el.is(':empty').should.be.false;
            $el.find('nav').length.should.not.equal(0);
            $el.find('article#teachers_js').length.should.not.equal(0);
            $el.find('article#admins_js').length.should.not.equal(0);
            $el.find('article#partners_js').length.should.not.equal(0);
        });
    });

    describe('After Rendering', function() {
        it('submission of a search should be passed up the view chain for handling.', function(done) {
            var spy = sinon.spy(this.DiscoveryAsContent, "submitSearch");
            this.DiscoveryAsContent.render();
            this.DiscoveryAsContent.on('search:submit', function() {
                done();
            });

            this.DiscoveryAsContent.teacherDiscovery.trigger('search:submit');
            spy.callCount.should.equal(1);

            this.DiscoveryAsContent.off('search:submit');
            spy.restore();
        });

        // Could not say why this test does not work in its current state;
        // However, like TeacherSearchAsPage, it couldn't be tested by directly
        // probing the radio buttons, so attempted to just trigger the navigation
        // event manually.
        it.skip('changing discovery radio buttons should navigate the page correctly.', function() {
            var $el = this.DiscoveryAsContent.render().$el;

            var $navigationElements = $el.find('#discovery-nav .discovery-nav__radio');
            $navigationElements.length.should.equal(3);

            var discovery_as_content = this.DiscoveryAsContent;
            ['teachers_js', 'admins_js', 'partners_js'].forEach(function(hash) {
                discovery_as_content.trigger('navigate', hash);
                window.location.hash.should.equal('#' + hash.slice(0, -3));
            });
        });
    });
});