/* global beforeEach, describe, it, Stem */

describe('TeachersAsDiscovery View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="teachers" class="discovery"></article>');
        this.Discovery = new Stem.Models.Discovery();
        this.TeachersAsDiscovery = new Stem.Views.TeachersAsDiscovery({
            $el: this.$Scaffolding,
            model: this.Discovery.get('teachers')
        });
    });

    it('render method should return the view', function() {
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

    it('after render, the anchor elements should have an href with a search that has no query', function() {
        var $el = this.TeachersAsDiscovery.render().$el;

        $el.find('#teachers-search-courses').length.should.equal(1);
        $el.find('#teachers-search-courses').attr('href').should.equal('#search//courses');

        $el.find('#teachers-search-groups').length.should.equal(1);
        $el.find('#teachers-search-groups').attr('href').should.equal('#search//groups');
    });

    it.skip('a change in the query of the underlying search model should update the href of the teacher anchor elements', function() {
        var $el = this.TeachersAsDiscovery.render().$el;
        $el.find('form > input.search__input').first().val('Test').trigger('input');
        $el.find('#teachers-search-courses').attr('href').should.equal('#search/Test/courses');
        $el.find('#teachers-search-groups').attr('href').should.equal('#search/Test/groups');
    });

    it('triggering a submit event on the searchForm should cause TeachersAsDiscovery to trigger a search:submit event.', function() {
        var $el = this.TeachersAsDiscovery.render().$el;
        var handler = sinon.spy();

        this.TeachersAsDiscovery.on('search:submit', handler);

        $el.find('button.search__submit').first().trigger('click');
        handler.callCount.should.equal(1); // submitSearch called.

        this.TeachersAsDiscovery.off('search:submit', handler);
    });

    it.skip('if the teachers model triggers a set:searchQuery event, the searchForm property of TeachersAsDiscovery should be updated and re-rendered.', function() {
        this.TeachersAsDiscovery.render();
        var handler = sinon.spy();

        this.TeachersAsDiscovery.model.on('set:searchQuery', handler);

        var newSearch = new Stem.Models.Search({
            label: 'Test',
            placeholder: 'Test'
        });
        this.TeachersAsDiscovery.model.set('searchQuery', newSearch);

        this.TeachersAsDiscovery.searchForm.model.should.equal(newSearch);
        handler.callCount.should.equal(1);

        this.TeachersAsDiscovery.model.off('set:searchQuery', handler);
    });
});