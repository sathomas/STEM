/*global beforeEach, afterEach, describe, it, Stem  */
'use strict';

describe('SearchForm View', function () {

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding')
            .css({'left':'-9999px','position': 'absolute'})
            .appendTo($('body'));
        this.SearchModel = new Stem.Models.Search({
            label: 'Label',
            placeholder: 'Placeholder',
            shortPlaceholder: 'Short Placeholder',
            query: 'Query'
        });
        this.SearchFormView = new Stem.Views.SearchForm({
            model: this.SearchModel
        });
        this.SearchFormView.render();
        this.$Scaffolding.append(this.SearchFormView.$el);
    });

    afterEach(function() {
        this.SearchFormView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.SearchFormView.render().should.equal(this.SearchFormView);
    });

    it('should enclose the subjects in a form with class and role', function() {
        var $el = this.SearchFormView.$el;
        $el.prop("tagName").should.equal('FORM');
        $el.hasClass('search').should.be.true();
        $el.attr('role').should.equal('search');
    });

    it('should add a label with appropriate text and classes', function() {
        var $el = this.SearchFormView.$el;
        $el.find('label').text().should.equal(this.SearchModel.get('label'));
        $el.find('label').hasClass('search__label').should.be.true();
        $el.find('label').hasClass('util--sr-only').should.be.false();
    });

    it('should add inputs for multiple viewports with appropriate placeholders and classes', function() {
        var $el = this.SearchFormView.$el;
        $el.find('input[type="search"]').length.should.equal(2);
        $el.find('input[type="search"].search__input').length.should.equal(2);
        $el.find('input[type="search"].search__input--small').length.should.equal(1);
        $el.find('input[type="search"].search__input').not('.search__input--small').attr('placeholder').should.equal(this.SearchModel.get('placeholder'));
        $el.find('input[type="search"].search__input--small').attr('placeholder').should.equal(this.SearchModel.get('shortPlaceholder'));
    });

    it('should set the query value', function() {
        var model = this.SearchModel,
            $el = this.SearchFormView.$el;
        $el.find('input[type="search"]').each(function() {
            $(this).val().should.equal(model.get('query'));
        });
    });

    it('should change the query value when the model changes', function() {
        var model = this.SearchModel,
            $el = this.SearchFormView.$el;
        model.set('query', 'New Query');
        $el.find('input[type="search"]').each(function() {
            $(this).val().should.equal(model.get('query'));
        });
    });

});
