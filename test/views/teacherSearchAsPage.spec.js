/* global beforeEach, describe, it, Stem */

describe('View::TeacherSearchAsPage', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<section id="teachers-search"></section>');
        this.TeacherSearch = new Stem.Models.TeacherSearch();
        this.TeacherSearchAsPage = new Stem.Views.TeacherSearchAsPage({
            el: this.$Scaffolding,
            model: this.TeacherSearch
        });
    });

    it('Render method should return the View (for chaining).', function() {
        this.TeacherSearchAsPage.render().should.equal(this.TeacherSearchAsPage);
    });

    it('After render, if the provided el was empty, should no longer be empty.', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        $el.is(':empty').should.be.false();
    });

    it('post-render: The root element of the View should have an ARIA label with an id value.', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('post-render: The h2 element in the View should have an id attribute with an id value.', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        var $heading = $el.find('h2');
        var num_headings = $heading.length;

        num_headings.should.equal(1);
        $heading.attr('id').should.match(/^[0-9]+$/);
    });

    it('post-render: A search form should exist in the DOM.', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        $el.find('.search > form.search').length.should.equal(1);
    });

    it('post-render: A filter list should exist in the DOM.', function() {
        var $el = this.TeacherSearchAsPage.render().$el;
        $el.find('.results-filter > .results-filter__list').length.should.equal(1);
    });

    it('post-render: By default, "content" should be the selected filter.', function() {
        var view = this.TeacherSearchAsPage.render();
        var $el = view.$el;

        var $results_main = $el.find('.results-main');
        var $contentMainView = view.contentMainView.$el;

        var assertion = $results_main.is($contentMainView.parent());
        assertion.should.be.true();
    });

    it('post-render: Triggering an expand event on a secondary view should expand it while compressing others.', function() {
        var view = this.TeacherSearchAsPage.render();

        view.coursesSecondaryView.$el.find('.results-secondary__extras button').trigger('click');

        view.contentSecondaryView.$el.attr('data-status').should.equal('compressed');
        view.coursesSecondaryView.$el.attr('data-status').should.equal('expanded');
        view.groupsSecondaryView.$el.attr('data-status').should.equal('compressed');
    });

    it.skip('post-render: Changing the searchFilter should re-arrange results.', function(done) {
        var functionSpy = sinon.spy(this.TeacherSearchAsPage, 'arrangeResults');
        var $el = this.TeacherSearchAsPage.render().$el;
        functionSpy.reset(); // arrangeResults called but not interested.

        var $filters = $el.find('.results-filter__list > .results-filter__list-item > .results-filter__list-item__input');
        var $courseSearchFilter = $($filters[1]);
        $courseSearchFilter.trigger('click').trigger('change');

        _.delay(function() {
            functionSpy.callCount.should.equal(1);

            var $results_main = $el.find('.results-main');
            var $coursesMainView = this.TeacherSearchAsPage.coursesMainView.$el;

            var assertion = $results_main.is($coursesMainView.parent());
            assertion.should.be.true();

            functionSpy.restore();
            done();
        }, 26); // 16ms debounce + 10ms delay.
    });
});