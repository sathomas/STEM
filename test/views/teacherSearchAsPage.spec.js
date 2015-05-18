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

    describe('Rendering', function() {
        it('should return the view (for chaining).', function() {
            this.TeacherSearchAsPage.render().should.equal(this.TeacherSearchAsPage);
        });

        it('should fill in the provided element, if it was empty.', function() {
            var $el = this.TeacherSearchAsPage.render().$el;
            $el.is(':empty').should.be.false();
        });

        it('should give the provided element an ARIA label with a valid id value.', function() {
            var $el = this.TeacherSearchAsPage.render().$el;
            $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
        });

        it('should give the sole h2 element in the view a valid id value.', function() {
            var $el = this.TeacherSearchAsPage.render().$el;
            var $heading = $el.find('h2');
            var num_headings = $heading.length;

            num_headings.should.equal(1);
            $heading.attr('id').should.match(/^[0-9]+$/);
        });

        it('should ensure a search form exists in the DOM.', function() {
            var $el = this.TeacherSearchAsPage.render().$el;
            $el.find('.search > form.search').length.should.equal(1);
        });

        it('should ensure a filter list exists in the DOM.', function() {
            var $el = this.TeacherSearchAsPage.render().$el;
            $el.find('.results-filter > .results-filter__list').length.should.equal(1);
        });

        it('should ensure content is the selected filter by default.', function() {
            var view = this.TeacherSearchAsPage.render();
            var $el = view.$el;

            var $results_main = $el.find('.results-main');
            var $contentMainView = view.contentMainView.$el;

            var assertion = $results_main.is($contentMainView.parent());
            assertion.should.be.true();
        });
    });

    describe('After Rendering', function() {
        it('triggering an expand event on a secondary view should expand it while compressing others.', function() {
            var view = this.TeacherSearchAsPage.render();

            view.coursesSecondaryView.$el.find('.results-secondary__extras button').trigger('click');

            view.contentSecondaryView.$el.attr('data-status').should.equal('compressed');
            view.coursesSecondaryView.$el.attr('data-status').should.equal('expanded');
            view.groupsSecondaryView.$el.attr('data-status').should.equal('compressed');
        });

        // There seems to be a problem when attempting to programatically trigger
        // radio buttons in tests.
        it.skip('changing the search filter should re-arrange results.', function(done) {
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
});