/* global Stem, describe, beforeEach, it */

describe('View::DiscoveryAsContent', function() {
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

    it('Render method should return the view (for chaining).', function() {
        this.DiscoveryAsContent.render().should.equal(this.DiscoveryAsContent);
    });

    it('After render, if the provided el was empty, should no longer be empty.', function() {
        var $el = this.DiscoveryAsContent.render().$el;
        $el.is(':empty').should.be.false();
    });

    it('post render: if the element is empty, the template should be used to fill it in', function() {
        var emptyDiscovery = new Stem.Views.DiscoveryAsContent({
            el: this.$emptyScaffolding,
            model: this.Discovery
        }).render();

        expect(emptyDiscovery.$el.is(':empty')).to.be.false;
    });

    it('post render: should navigate to the hash when discovery radio buttons are changed', function() {
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