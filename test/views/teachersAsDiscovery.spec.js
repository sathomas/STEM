/* global beforeEach, describe, it, Stem */

describe('TeachersAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="teachers"></article>');
        this.Discovery = new Stem.Models.Discovery();
        this.TeachersAsDiscovery = new Stem.Views.TeachersAsDiscovery({
            $el: this.$Scaffolding,
            model: this.Discovery
        });
    });

    it('render method should return the view, whether or not el was empty', function() {
        this.TeachersAsDiscovery.render().should.equal(this.TeachersAsDiscovery);
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

    it('after render, the anchor elements should have an href with a search that has but no query', function() {
        var $el = this.TeachersAsDiscovery.render().$el;

        $el.find('#teachers-search-courses').length.should.equal(1);
        $el.find('#teachers-search-courses').attr('href').should.equal('#search//courses');

        $el.find('#teachers-search-groups').length.should.equal(1);
        $el.find('#teachers-search-groups').attr('href').should.equal('#search//groups');
    });

    it('triggering a submit event on the searchForm should cause TeachersAsDiscovery to trigger search:submit on itself.', function() {
        var view = this.TeachersAsDiscovery.render();
        var externalHandler = sinon.spy();
        var internalHandler = sinon.spy();

        view.searchForm.on('submit', externalHandler);
        view.on('search:submit', internalHandler);

        view.searchForm.$el.find('button').first().trigger('click');
        externalHandler.callCount.should.equal(1); // this indicates that the external submit event was recieved, and submitSearch called.
        internalHandler.callCount.should.equal(1); // this indicates search:submit was fired from submitSearch.

        view.searchForm.off('submit', externalHandler);
        view.off('search:submit', internalHandler);
    });

    it.skip('if Discovery triggers a set:searchQuery event, the searchForm attached to TeachersAsDiscovery will be destroyed and re-created', function() {
        var view = this.TeachersAsDiscovery.render();
        var handler = sinon.spy();

        view.model.on('set:searchQuery', handler);
        view.model.set('searchQuery', new Stem.Models.Search({
            label: "Test label",
            placeholder: "Test placeholder"
        }));

        handler.callCount.should.equal(1);

        view.off('set:searchQuery', handler);
    });
});