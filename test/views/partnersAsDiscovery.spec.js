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

    it('post-render: The root element of the view should have ARIA label with an id value', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('post-render: The h3 element in the view should have an id value', function() {
        var $el = this.PartnersAsDiscovery.render().$el;

        $el.find('h3').length.should.equal(1);
        $el.find('h3').attr('id').should.match(/^[0-9]+$/);
    });

    it('post-render: Child views should be rendered.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;

        var $organizations_map = $el.find('#partners-organizations-map');
        $organizations_map.hasClass('leaflet-container').should.be.true();
        $organizations_map.is(':empty').should.be.false();

        var $organizations_map_filter = $el.find('#partners-organizations-filter');
        $organizations_map_filter.is(':empty').should.be.false();

        var $proposals_map = $el.find('#partners-donorschoose-map');
        $proposals_map.hasClass('leaflet-container').should.be.true();
        $proposals_map.is(':empty').should.be.false();

        var $partnership_list = $el.find('#partners-spotlights');
        $partnership_list.hasClass('spotlight').should.be.true();
        $partnership_list.is(':empty').should.be.true();
    });

    it('post-render: There should be a link to the Partnering Guide in the view.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        $el.find('a[href="http://www.stemincubator.gatech.edu/handbook"]').length.should.not.equal(0);
    });


    it.skip('post-render: Changing a tag in the tagset should update the filters for the organizations map.', function() {
        var $el = this.PartnersAsDiscovery.render().$el;
        var spy = sinon.spy(this.PartnersAsDiscovery, "updateFilters");

        var count = 0;
        var $filters = $el.find('#partners-organizations-filter .chkbox');
        $filters.children().each(function(index, element) {
            $(element).trigger('click');
            count++;
        });

        spy.callCount.should.equal(count);
    });
});