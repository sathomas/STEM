/* global beforeEach, describe, it, Stem */

describe('AdminsAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="admins" class="discovery theme-2"><div id="a</article>');
        this.Discovery = new Stem.Models.Discovery();
        this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
            el: this.$Scaffolding,
            model: this.Discovery.get('admins')
        });
    });

    it('render method should return the view', function() {
        this.AdminsAsDiscovery.render().should.equal(this.AdminsAsDiscovery);
    });

    it('after render, the root element of the view should have ARIA label with an id value', function() {
        var $el = this.AdminsAsDiscovery.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('after render, the h3 element in the view should have an id value', function() {
        var $el = this.AdminsAsDiscovery.render().$el;

        $el.find('h3').length.should.equal(1);
        $el.find('h3').attr('id').should.match(/^[0-9]+$/);
    });

    it('after render, should have a link to stemgeorgia roadmap', function() {
        var $el = this.AdminsAsDiscovery.render().$el;

        $el.find('.invite .btn').length.should.equal(1);
        $el.find('.invite .btn').attr('href').should.equal('http://stemgeorgia.org/roadmap/');
    });

    it('after render, the map div should be a leaflet container', function() {
        var $el = this.AdminsAsDiscovery.render().$el;

        var mapContainer = $el.find('#admins-certifications-map');
        mapContainer.length.should.equal(1);
        mapContainer.hasClass('leaflet-container').should.be.true();
    });

    it('after render, should have link to show more spotlights', function() {
        // var $el = this.AdminsAsDiscovery.render().$el;

        // $el.find('admins-spotlights')
        // var $el = this.OaeAsSecondarySearchGroup.render().$el;
        // var redirectStub = sinon.stub(Stem.Utils, 'redirect');
        // $el.find('button').click();
        // redirectStub.calledWith('/more/link').should.be.true();
        // redirectStub.restore();
    });
});