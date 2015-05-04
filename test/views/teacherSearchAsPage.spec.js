/* global beforeEach, describe, it, Stem */

describe('TeacherSearchAsPage View', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<section id="teachers-search"></section>');
        this.TeacherSearch = new Stem.Models.TeacherSearch();
        this.TeacherSearchAsPage = new Stem.Views.TeacherSearchAsPage({
            el: this.$Scaffolding,
            model: this.TeacherSearch
        });
    });

    it('render method should return the view', function() {
        this.TeacherSearchAsPage.render().should.equal(this.TeacherSearchAsPage);
    });

    it('after render, the root element of the view should have ARIA label with an id value', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('after render, the h3 element in the view should have an id value', function() {
        var $el = this.TeacherSearchAsPage.render().$el;

        $el.find('h2').length.should.equal(1);
        $el.find('h2').attr('id').should.match(/^[0-9]+$/);
    });

    it('after render, a search form should exist in the DOM', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        $el.find('.search > form.search').length.should.equal(1);
    });

    it('after render, the filter list view should exist in the DOM', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        $el.find('.results-filter > .results-filter__list').length.should.equal(1);
    });

    it('after render, content should be the selected filter', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        var $results_main = $el.find('.results-main');
        $results_main.is(this.TeacherSearchAsPage.contentMainView.$el.parent()).should.be.true();
    });

    it('after render, changing the selected TeacherSearch searchFilter property should change the main view of TeacherSearchAsPage', function() {
        var SEARCHFILTER_CHANGE_EVENT_TIMEOUT = 16; // ms
        var $el = this.TeacherSearchAsPage.render().$el;
        var $results_main = $el.find('.results-main');

        this.TeacherSearch.get('searchFilters').set('facet', 'courses');
        this.timeout(SEARCHFILTER_CHANGE_EVENT_TIMEOUT);
        var $results_main = $el.find('.results-main');

        $results_main.is(this.TeacherSearchAsPage.coursesMainView.$el.parent()).should.be.true();
    });
});