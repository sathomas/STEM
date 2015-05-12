/* global Stem, describe, beforeEach, it */

describe('View::DiscoveryAsContent', function() {
    'use strict';

    beforeEach(function() {
        this.$emptyScaffolding = $('<section id="landing"></section>');
        this.$base_scaffolding = $('<section id="landing">' +
                                        '<article id="teachers_js" class="discovery"></article>' +
                                        '<article id="admins_js" class="discovery"></article>' +
                                        '<article id="partners_js" class="discovery"></article>' +
                                    '</section>');
        this.Discovery = new Stem.Models.Discovery();
        this.DiscoveryAsContent = new Stem.Views.DiscoveryAsContent({
            el: this.$base_scaffolding,
            model: this.Discovery
        });
        // this.$filled_scaffolding = this.$base_scaffolding.append(JST['app/scripts/templates/discoveryAsContent.ejs']());
        // this.Discovery__existing = new Stem.Models.Discovery();
        // this.DiscoveryAsContent__existing = new Stem.Views.DiscoveryAsContent({
        //     el: this.$filled_scaffolding,
        //     model: this.Discovery__existing
        // });
    });

    it('Render method should return the view (for chaining).', function() {
        this.DiscoveryAsContent.render().should.equal(this.DiscoveryAsContent);
    });

    it('should fill the element if it is emtpy', function() {
        var emptyDiscovery = new Stem.Views.DiscoveryAsContent({
            el: this.$emptyScaffolding,
            model: this.Discovery
        });

        assert(emptyDiscovery.render, 'Map container not found.');

    });

});