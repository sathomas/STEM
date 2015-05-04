/* global beforeEach, describe, it, Stem */

describe('partnersAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="partners" class="discovery theme-3"></article>');
        this.Discovery = new Stem.Models.Discovery();
        this.PartnersAsDiscovery = new Stem.Views.PartnersAsDiscovery({
            el: this.$Scaffolding,
            model: this.Discovery.get('partners')
        });
    });

    it('render method should return the view', function() {
        this.PartnersAsDiscovery.render().should.equal(this.PartnersAsDiscovery);
    });

    it('after render, the root element of the view should have ARIA label with an id value', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('after render, the h3 element in the view should have an id value', function() {
        var $el = this.PartnersAsDiscovery.render().$el;

        $el.find('h3').length.should.equal(1);
        $el.find('h3').attr('id').should.match(/^[0-9]+$/);
    });
});