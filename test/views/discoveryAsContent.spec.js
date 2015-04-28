/* global describe */

describe('DiscoveryAsContent View', function() {
    'use strict';

    beforeEach(function() {
        this.$base_scaffolding = $('<section id="#landing"></div>');
        this.Discovery__empty = new Stem.Models.Discovery();
        this.DiscoveryAsContent__empty = new Stem.Views.DiscoveryAsContent({
            el: this.$base_scaffolding,
            model: this.Discovery__empty
        });

        this.$filled_scaffolding = this.$base_scaffolding.append(JST['app/scripts/templates/discoveryAsContent.ejs']());
        this.Discovery__existing = new Stem.Models.Discovery();
        this.DiscoveryAsContent__existing = new Stem.Views.DiscoveryAsContent({
            el: this.$filled_scaffolding,
            model: this.Discovery__existing
        });
    });

    /*
    it('render method should return a full view even if $el is empty', function() {
        this.DiscoveryAsContent__empty.render().should.equal(something);
    });

    it('render method should fill in view if $el is not empty', function() {
        this.DiscoveryAsContent__existing.render().should.equal(something);
    });
    */
});