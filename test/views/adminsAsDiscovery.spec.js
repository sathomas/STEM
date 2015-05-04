/* global beforeEach, describe, it, Stem */

describe('adminsAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="admins" class="discovery theme-2"></article>');
        this.Discovery = new Stem.Models.Discovery();
        this.AdminsAsDiscovery = new Stem.Views.AdminsAsDiscovery({
            $el: this.$Scaffolding,
            model: this.Discovery.get('admins')
        });
    });

    it('render method should return the view', function() {
        this.AdminsAsDiscovery.render().should.equal(this.AdminsAsDiscovery);
    });

    it('after render, the root element of the view should have ARIA label with an id value', function() {
        var $el = this.TeachersAsDiscovery.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('after render, the h3 element in the view should have an id value', function() {
        var $el = this.TeachersAsDiscovery.render().$el;

        $el.find('h3').length.should.equal(1);
        $el.find('h3').attr('id').should.match(/^[0-9]+$/);
    });
});