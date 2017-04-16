/* global Stem, describe, beforeEach, it */

describe('PartnersAsDiscovery View', function() {
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

    describe('Rendering', function() {
        it('should return the view (for chaining).', function() {
            this.PartnersAsDiscovery.render().should.equal(this.PartnersAsDiscovery);
        });

        it('should fill in the provided element, if it was empty.', function() {
            var $el = this.PartnersAsDiscovery.render().$el;
            $el.is(':empty').should.be.false();
        });

        it('should give the provided element an ARIA label with a valid id value.', function() {
            var $el = this.PartnersAsDiscovery.render().$el;
            $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
        });

        it('should give the sole h3 element in the view a valid id value.', function() {
            var $el = this.PartnersAsDiscovery.render().$el;
            $el.find('h3').length.should.equal(1);
            $el.find('h3').attr('id').should.match(/^[0-9]+$/);
        });

        it('should add a link to the Partnering Guide to the view.', function() {
            var $el = this.PartnersAsDiscovery.render().$el;
            $el.find('a[href="http://www.stemincubator.gatech.edu/handbook"]').length.should.equal(1);
        });

        it('should initialize/render child views properly.', function() {
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

        it('should not show the spotlight if the partnership list is empty.', function() {
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

        it('should show the spotlight if the partnership list is not empty.', function() {
            var baseUrl = Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/api/group/';
            var subgroupUrl = new RegExp(baseUrl + '.+/members([?]limit=\d+)?');
            var server = sinon.fakeServer.create();
            server.respondImmediately = true;
            server.respondWith("GET", subgroupUrl, [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify([{'profile': { 'resourceType': 'group' }, 'role': 'test'},
                                {'profile': { 'resourceType': 'group' }, 'role': 'test'}])
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

    describe('After Rendering', function() {
        it('changing the organizations filter checkboxes should update the organizations map markers.', function() {
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

        it('if the spotlight is hidden and an item is added to the partnerships, spotlight should be shown.', function() {
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
            this.Partners.get('partnerships').add(
                new Stem.Models.Group({
                    picture: { medium: '' },
                    profilePath: '',
                    displayName: '',
                    description: ''
                })
            );

            $el.find('.spotlight-block').hasClass('util--hide').should.be.false();

            server.restore();
        });
    });

});