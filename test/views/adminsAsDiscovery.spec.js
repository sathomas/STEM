/* global Stem, describe, beforeEach, it */

describe('View::AdminsAsDiscovery', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="admins" class="discovery theme-2"></article>');
        this.Discovery = new Stem.Models.Discovery();
        this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
            el: this.$Scaffolding,
            model: this.Discovery.get('admins')
        });
    });

    it('Render method should return the view (for chaining).', function() {
        this.AdminsAsDiscovery.render().should.equal(this.AdminsAsDiscovery);
    });

    it('After render, the root element of the view should have an ARIA label with a valid id value.', function() {
        var $el = this.AdminsAsDiscovery.render().$el;
        $el.attr('aria-labelledby').should.not.be.undefined();
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('After render, the sole h3 element in the view should have a valid id value.', function() {
        var $el = this.AdminsAsDiscovery.render().$el;
        $el.find('h3').length.should.equal(1);
        $el.find('h3').attr('id').should.match(/^[0-9]+$/);
    });

    it('After render, there should be a link to the stemgeorgia.org roadmap in the view.', function() {
        var $el = this.AdminsAsDiscovery.render().$el;
        $el.find('.invite .btn').length.should.equal(1);
        $el.find('.invite .btn').attr('href').should.equal('http://stemgeorgia.org/roadmap/');
    });

    it('After render, the map container should exist, and be initialized with Leaflet.', function() {
        var $el = this.AdminsAsDiscovery.render().$el;
        $el.find('#admins-certifications-map').length.should.equal(1);
        $el.find('#admins-certifications-map').hasClass('leaflet-container').should.be.true();
    });

});