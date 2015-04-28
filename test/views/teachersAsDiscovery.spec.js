/* global beforeEach, describe, it, Stem */

describe('TeachersAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding__empty = $('<article id="teachers"></article>');
        this.Discovery__empty = new Stem.Models.Discovery();
        this.TeachersAsDiscovery__empty = new Stem.Views.TeachersAsDiscovery({
            $el: this.$Scaffolding__empty,
            model: this.Discovery__empty
        });

        this.$Scaffolding__existing = $('<article id="teachers"></article>').append(JST['app/scripts/']);
        this.Discovery__existing = new Stem.Models.Discovery();
        this.TeachersAsDiscovery__existing = new Stem.Views.TeachersAsDiscovery({
            $el: this.$Scaffolding__existing,
            model: this.Discovery__existing
        });
    });

    it('render method should return the view, whether or not el was empty', function() {
        this.TeachersAsDiscovery__empty.render().should.equal(this.TeachersAsDiscovery__empty);
        this.TeachersAsDiscovery__existing.render().should.equal(this.TeachersAsDiscovery__existing);
    });


    it('after render, heading should have ARIA label, whether or not el was empty', function() {
        var $el__empty = this.TeachersAsDiscovery__empty.render().$el;
        $el__empty.attr('aria-labelledby').should.match(/^[0-9]+$/);

        var $el__existing = this.TeachersAsDiscovery__existing.render().$el;
        $el__existing.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });
});