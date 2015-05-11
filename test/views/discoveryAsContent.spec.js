/* global Stem, describe, beforeEach, it */

describe('View::DiscoveryAsContent', function() {
    'use strict';

    beforeEach(function() {
        var self = this;
        self.$base_scaffolding = $('<section id="landing"></section>');
        self.Discovery = new Stem.Models.Discovery();
        self.DiscoveryAsContent = new Stem.Views.DiscoveryAsContent({
            el: self.$base_scaffolding,
            model: self.Discovery
        });

        var template = $(self.DiscoveryAsContent.template());
        _(['teachers','admins','partners']).each(function(id) {
            $(self.DiscoveryAsContent.template()).find('#' + id).attr('id', id + '_js');
        });
        var html = template.html();
        self.DiscoveryAsContent.template = template.html();
        // this.$filled_scaffolding = this.$base_scaffolding.append(JST['app/scripts/templates/discoveryAsContent.ejs']());
        // this.Discovery__existing = new Stem.Models.Discovery();
        // this.DiscoveryAsContent__existing = new Stem.Views.DiscoveryAsContent({
        //     el: this.$filled_scaffolding,
        //     model: this.Discovery__existing
        // });
    });

    it('Render method should return the view (for chaining).', function() {
        self.DiscoveryAsContent.render().should.equal(self.DiscoveryAsContent);
    });

});