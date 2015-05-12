/* global Stem, describe, beforeEach, it */

describe('View::PartnersAsDiscovery', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="partners" class="discovery theme-3"></article>');
        this.Discovery = new Stem.Models.Discovery();
        this.PartnersAsDiscovery = new Stem.Views.PartnersAsDiscovery({
            el: this.$Scaffolding,
            model: this.Discovery.get('partners')
        });
    });

    it('Render method should return the view (for chaining).', function() {
        this.PartnersAsDiscovery.render().should.equal(this.PartnersAsDiscovery);
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

});