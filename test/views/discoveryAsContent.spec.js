/* global Stem, describe, beforeEach, it */

describe('DiscoveryAsContent View', function() {
    'use strict';

    beforeEach(function() {
        this.$emptyScaffolding = $('<section id="landing"></section>');
        this.$scaffolding = $('<section id="landing">' +
                                '<article id="teachers_js" class="discovery"></article>' +
                                '<article id="admins_js" class="discovery"></article>' +
                                '<article id="partners_js" class="discovery"></article>' +
                            '</section>');
        this.Discovery = new Stem.Models.Discovery();
        this.DiscoveryAsContent = new Stem.Views.DiscoveryAsContent({
            el: this.$emptyScaffolding,
            model: this.Discovery
        });
    });

    describe('Rendering', function() {
        it('should return the view (for chaining).', function() {
            this.DiscoveryAsContent.render().should.equal(this.DiscoveryAsContent);
        });

        it('should fill in the provided element, if it was empty.', function() {
            var emptyDiscovery = new Stem.Views.DiscoveryAsContent({
                el: this.$emptyScaffolding,
                model: this.Discovery
            }).render();

            expect(emptyDiscovery.$el.is(':empty')).to.be.false;
        });

        it('should fill in a scaffolding which already contains discovery articles.', function() {
            var $el = this.DiscoveryAsContent.render().$el;
            $el.is(':empty').should.be.false();
        });
    });

    describe('After Rendering', function() {
        it('changing discovery radio buttons should navigate the page to the correct hash.', function() {
            var $el = this.DiscoveryAsContent.render().$el;

            var radioButtons = $el.find('.discovery-nav__radio');
            radioButtons.length.should.equal(3);

            var radioButton = radioButtons[1];
            $(radioButton).click();

            var discoveryNav = $el.find('#discovery-nav');
            discoveryNav.on('change', function() {
                console.log('changed!');
            });

            discoveryNav.change();

            // var ev = document.createEvent("MouseEvent");
            // ev.initMouseEvent(
            //   "click",
            //   true /* bubble */, true /* cancelable */,
            //   window, null,
            //   0, 0, 0, 0, /* coordinates */
            //   false, false, false, false, /* modifier keys */
            //   0 /*left*/, null
            // );
            // el.dispatchEvent(ev);
            click(radioButton);

            function click(el){
                var ev = document.createEvent("MouseEvent");
                ev.initMouseEvent(
                    "click",
                    true /* bubble */, true /* cancelable */,
                    window, null,
                    0, 0, 0, 0, /* coordinates */
                    false, false, false, false, /* modifier keys */
                    0 /*left*/, null
                );
                el.dispatchEvent(ev);
            }
        });
    });
});