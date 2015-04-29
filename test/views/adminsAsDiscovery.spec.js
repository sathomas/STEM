/* global beforeEach, describe, it, Stem */

describe('adminsAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.Admins = new Stem.Models.Admins({
        });
        this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
            $el: $('<div id="#admins"></div>'),
            model: this.Admins
        });
    });

    /*
    it('render method should return the view even if $el is empty', function() {
        this.AdminsAsDiscovery.render().should.equal(this.AdminsAsDiscovery);
    });
    */
});