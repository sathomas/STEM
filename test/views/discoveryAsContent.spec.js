/* global Stem, describe, beforeEach, it */

describe('View::DiscoveryAsContent', function() {
    'use strict';

    beforeEach(function() {
        this.$base_scaffolding = $('<section id="landing">' +
                                        '<article id="teachers_js" class="discovery">' +
                                        '<article id="admins_js" class="discovery">' +
                                        '<article id="partners_js" class="discovery">' +
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

});