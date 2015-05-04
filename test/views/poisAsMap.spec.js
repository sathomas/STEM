/* global beforeEach, describe, it, Stem, L */

describe('PoisAsMap View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding_admins = $('<div id="admins-certifications-map"></div>');
        this.$Scaffolding_partners1 = $('<div id="partners-organizations-filter"></div>');
        this.$Scaffolding_partners2 = $('<div id="partners-donorschoose-map"></div>');
        this.Discovery = new Stem.Models.Discovery();
        this.Admins = this.Discovery.get('admins');
        this.Partners = this.Discovery.get('partners');

        this.PoisAsMap_admins = new Stem.Views.PoisAsMap({
            $el: this.$Scaffolding_admins,
            collection: this.Admins.get('certificationPois')
        });
        this.PoisAsMap_partners1 = new Stem.Views.PoisAsMap({
            $el: this.$Scaffolding_partners1,
            collection: this.Partners.get('organizationPois')
        });
        this.PoisAsMap_partners2 = new Stem.Views.PoisAsMap({
            $el: this.$Scaffolding_partners2,
            collection: this.Partners.get('proposalPois')
        });
    });

    it('render methods should return the view', function() {
        this.PoisAsMap_admins.render().should.equal(this.PoisAsMap_admins);
        this.PoisAsMap_partners1.render().should.equal(this.PoisAsMap_partners1);
        this.PoisAsMap_partners2.render().should.equal(this.PoisAsMap_partners2);
    });
});