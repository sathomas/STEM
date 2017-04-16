/* global Stem, describe, beforeEach, it */

describe('AdminsAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="admins" class="discovery theme-2"></article>');
        this.Admins = new Stem.Models.Admins({
            searchQuery: new Stem.Models.Search()
        });
        this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
            el: this.$Scaffolding,
            model: this.Admins
        });
    });

    describe('Rendering', function() {
        it('should return the view (for chaining).', function() {
            this.AdminsAsDiscovery.render().should.equal(this.AdminsAsDiscovery);
        });

        it('should fill in the provided element, if it was empty.', function() {
            var $el = this.AdminsAsDiscovery.render().$el;
            $el.is(':empty').should.be.false();
        });

        it('should give the provided element an ARIA label with a valid id value.', function() {
            var $el = this.AdminsAsDiscovery.render().$el;
            $el.attr('aria-labelledby').should.not.be.undefined();
            $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
        });

        it('should give the sole h3 element in the view a valid id value.', function() {
            var $el = this.AdminsAsDiscovery.render().$el;
            $el.find('h3').length.should.equal(1);
            $el.find('h3').attr('id').should.match(/^[0-9]+$/);
        });

        it('should add a link to the stemgeorgia.org roadmap in the view.', function() {
            var $el = this.AdminsAsDiscovery.render().$el;
            $el.find('.invite .btn').length.should.equal(1);
            $el.find('.invite .btn').attr('href').should.equal('http://stemgeorgia.org/roadmap/');
        });

        it('should have a certifications map, which is initialized with Leaflet.', function() {
            var $el = this.AdminsAsDiscovery.render().$el;
            $el.find('#admins-certifications-map').length.should.equal(1);
            $el.find('#admins-certifications-map').hasClass('leaflet-container').should.be.true();
        });

        it('should not show the spotlight if the spotlights list is empty.', function() {
            var baseUrl = Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/api/group/';
            var subgroupUrl = new RegExp(baseUrl + '.+/members([?]limit=\d+)?');
            var server = sinon.fakeServer.create();
            server.respondImmediately = true;
            server.respondWith("GET", subgroupUrl, [200, { 'Content-Type': 'application/json' }, '[]']);

            /* Reset test fixtures */
            this.Admins = new Stem.Models.Admins({
                searchQuery: new Stem.Models.Search()
            });
            server.respond();
            this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
                el: this.$Scaffolding.empty(),
                model: this.Admins
            });

            var $el = this.AdminsAsDiscovery.render().$el;
            $el.find('.spotlight-block').hasClass('util--hide').should.be.true();

            server.restore();
        });

        it('should show the spotlight if the spotlights list is not empty.', function() {
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
            this.Admins = new Stem.Models.Admins({
                searchQuery: new Stem.Models.Search()
            });
            server.respond();
            this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
                el: this.$Scaffolding.empty(),
                model: this.Admins
            });

            var $el = this.AdminsAsDiscovery.render().$el;
            $el.find('.spotlight-block').hasClass('util--hide').should.be.false();

            server.restore();
        });
    });

    describe('After Rendering', function() {
        it('if the spotlight is hidden and an item is added to the spotlights, spotlight should be shown.', function() {
            var baseUrl = Stem.config.oae.protocol + '//' + Stem.config.oae.host + '/api/group/';
            var subgroupUrl = new RegExp(baseUrl + '.+/members([?]limit=\d+)?');
            var server = sinon.fakeServer.create();
            server.respondImmediately = true;
            server.respondWith("GET", subgroupUrl, [200, { 'Content-Type': 'application/json' }, '[]']);

            /* Reset test fixtures */
            this.Admins = new Stem.Models.Admins({
                searchQuery: new Stem.Models.Search()
            });
            server.respond();
            this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
                el: this.$Scaffolding.empty(),
                model: this.Admins
            });

            var $el = this.AdminsAsDiscovery.render().$el;
            this.Admins.get('spotlights').add(
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