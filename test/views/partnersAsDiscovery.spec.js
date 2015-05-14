/* global Stem, describe, beforeEach, it */

describe('View::PartnersAsDiscovery', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="partners" class="discovery theme-3"></article>');
        this.Partners = new Stem.Models.Partners({
            searchQuery: new Stem.Models.Search()
        });
        this.PartnersAsDiscovery = new Stem.Views.PartnersAsDiscovery({
            el: this.$Scaffolding,
            model: this.Partners
        });
    });

    it('Render method should return the view (for chaining).', function() {
        this.PartnersAsDiscovery.render().should.equal(this.PartnersAsDiscovery);
    });

    it('After render, if the provided el was empty, should no longer be empty.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        $el.is(':empty').should.be.false();
    });

    it('After render, the root element of the view should have an ARIA label with a valid id value.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('After render, the sole h3 element in the view should have a valid id value.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        $el.find('h3').length.should.equal(1);
        $el.find('h3').attr('id').should.match(/^[0-9]+$/);
    });

    it('After render, there should be a link to the Partnering Guide in the view.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        $el.find('a[href="http://www.stemincubator.gatech.edu/handbook"]').length.should.equal(1);
    });

    it('After render, child views should be initialized/rendered properly.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;

        // Should be rendered and initialized with Leaflet.
        var $organizations_map = $el.find('#partners-organizations-map');
        $organizations_map.hasClass('leaflet-container').should.be.true();
        $organizations_map.is(':empty').should.be.false();

        // Should be rendered.
        var $organizations_map_filter = $el.find('#partners-organizations-filter');
        $organizations_map_filter.is(':empty').should.be.false();

        // Should be rendered and initialized with Leaflet.
        var $proposals_map = $el.find('#partners-donorschoose-map');
        $proposals_map.hasClass('leaflet-container').should.be.true();
        $proposals_map.is(':empty').should.be.false();

        // Should be rendered.
        var $partnership_list = $el.find('#partners-spotlights');
        $partnership_list.hasClass('spotlight').should.be.true();
        $partnership_list.is(':empty').should.be.true();
    });

    it('After render, changing the filter checkboxes should update the filters for the organizations map.', function() {
        var spy = sinon.spy(this.PartnersAsDiscovery, 'updateFilters');
        var $el = this.PartnersAsDiscovery.render().$el;

        var count = 0;
        var $filters = $el.find('#partners-organizations-filter .chkbox');
        $filters.children('input').each(function(index, element) {
            $(element).trigger('click').trigger('change');
            count++;
        });

        spy.callCount.should.equal(count);

        spy.restore();
    });

    it('After render, if the spotlight list is empty, it should be hidden.', function() {
        var baseUrl = Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/api/group/';
        var subgroupUrl = new RegExp(baseUrl + '.+/members([?]limit=\d+)?');
        var server = sinon.fakeServer.create();
        server.respondImmediately = true;
        server.respondWith("GET", subgroupUrl, [200, { 'Content-Type': 'application/json' }, '[]']);

        /* Reset test fixtures */
        this.Partners = new Stem.Models.Partners({
            searchQuery: new Stem.Models.Search()
        });
        server.respond();
        this.PartnersAsDiscovery = new Stem.Views.PartnersAsDiscovery({
            el: this.$Scaffolding.empty(),
            model: this.Partners
        });

        var $el = this.PartnersAsDiscovery.render().$el;
        $el.find('.spotlight-block').hasClass('util--hide').should.be.true();

        server.restore();
    });

    it('After render, if the initially empty partnerships collection is populated, spotlights should be shown.', function() {
        var baseUrl = Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/api/group/';
        var groupUrl = new RegExp(baseUrl + '\d+$');
        var subgroupUrl = new RegExp(baseUrl + '.+/members([?]limit=\d+)?');
        var server = sinon.fakeServer.create();
        server.respondImmediately = true;
        server.respondWith("GET", groupUrl, [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify({ 'resourceType': 'group' })
        ]);
        server.respondWith("GET", subgroupUrl, [200, { 'Content-Type': 'application/json' }, '[]']);

        /* Reset test fixtures */
        this.Partners = new Stem.Models.Partners({
            searchQuery: new Stem.Models.Search()
        });
        server.respond();
        this.PartnersAsDiscovery = new Stem.Views.PartnersAsDiscovery({
            el: this.$Scaffolding.empty(),
            model: this.Partners
        });

        var $el = this.PartnersAsDiscovery.render().$el;
        this.Partners.get('partnerships').add(new Stem.Models.Group({ 'id': 1000 }));
        server.respond();
        $el.find('.spotlight-block').hasClass('util--hide').should.be.false();

        server.restore();
    });


    it('After render, if the spotlight list is populated, it should be shown.', function() {
        var baseUrl = Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/api/group/';
        var subgroupUrl = new RegExp(baseUrl + '.+/members([?]limit=\d+)?');
        var server = sinon.fakeServer.create();
        server.respondImmediately = true;
        server.respondWith("GET", subgroupUrl, [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify([{"profile":{}, "role": "test"}, {"profile": { "resourceType": "group" }, "role": "test"}])
        ]);

        /* Reset test fixtures */
        this.Partners = new Stem.Models.Partners({
            searchQuery: new Stem.Models.Search()
        });
        server.respond();
        this.PartnersAsDiscovery = new Stem.Views.PartnersAsDiscovery({
            el: this.$Scaffolding.empty(),
            model: this.Partners
        });

        var $el = this.PartnersAsDiscovery.render().$el;
        $el.find('.spotlight-block').hasClass('util--hide').should.be.false();

        server.restore();
    });

});