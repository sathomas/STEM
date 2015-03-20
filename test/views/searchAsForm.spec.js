/*global beforeEach, afterEach, describe, it, sinon, Stem, $  */

describe('SearchAsForm View', function () {
    'use strict';

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
        this.SearchAsFormView = new Stem.Views.SearchAsForm({
            model: this.SearchModel,
            theme: 'theme'
        });
        this.SearchAsFormView.render();
        this.$Scaffolding.append(this.SearchAsFormView.$el);
    });

    afterEach(function() {
        this.SearchAsFormView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.SearchAsFormView.render().should.equal(this.SearchAsFormView);
    });

    it('should enclose the subjects in a form with class and role', function() {
        var $el = this.SearchAsFormView.$el;
        $el.prop("tagName").should.equal('FORM');
        $el.hasClass('search').should.be.true();
        $el.attr('role').should.equal('search');
    });

    it('should apply a custom theme', function() {
        var $el = this.SearchAsFormView.$el;
        $el.hasClass('theme').should.be.true();
    });

    it('should add a label with appropriate text and classes', function() {
        var $el = this.SearchAsFormView.$el;
        $el.find('label').text().should.equal(this.SearchModel.get('label'));
        $el.find('label').hasClass('search__label').should.be.true();
        $el.find('label').hasClass('util--sr-only').should.be.false();
    });

    it('should add inputs for multiple viewports with appropriate placeholders and classes', function() {
        var $el = this.SearchAsFormView.$el;
        $el.find('input[type="search"]').length.should.equal(2);
        $el.find('input[type="search"].search__input').length.should.equal(2);
        $el.find('input[type="search"].search__input--small').length.should.equal(1);
        $el.find('input[type="search"].search__input').not('.search__input--small').attr('placeholder').should.equal(this.SearchModel.get('placeholder'));
        $el.find('input[type="search"].search__input--small').attr('placeholder').should.equal(this.SearchModel.get('shortPlaceholder'));
    });

    it('should add submit buttons for multiple viewports with appropriate classes', function() {
        var $el = this.SearchAsFormView.$el;
        $el.find('button').length.should.equal(2);
        $el.find('button.search__submit').length.should.equal(2);
        $el.find('button.search__submit--small').length.should.equal(1);
        $el.find('button.search__submit').not('.search__submit--small').text().should.equal('Search');
        $el.find('button.search__submit--small i').length.should.equal(1);
        $el.find('button.search__submit--small i').hasClass('fa').should.be.true();
        $el.find('button.search__submit--small i').hasClass('fa-search').should.be.true();
    });

    it('should set the query value', function() {
        var model = this.SearchModel,
            $el = this.SearchAsFormView.$el;
        $el.find('input[type="search"]').each(function() {
            $(this).val().should.equal(model.get('query'));
        });
    });

    it('should change the query value when the model changes', function() {
        var model = this.SearchModel,
            $el = this.SearchAsFormView.$el;
        model.set('query', 'New Query');
        $el.find('input[type="search"]').each(function() {
            $(this).val().should.equal(model.get('query'));
        });
    });

    it('should update the model when the input changes', function() {
        var $el = this.SearchAsFormView.$el;
        $el.find('input[type="search"]').first().val('New Query').trigger('input');
        this.SearchModel.get('query').should.equal('New Query');
    });

    it('should trigger an event on submission', function() {
        var $el = this.SearchAsFormView.$el;
        var handler = sinon.spy();
        this.SearchAsFormView.on('submit', handler);
        $el.find('button').first().trigger('click');
        handler.callCount.should.equal(1);
        this.SearchAsFormView.off('submit', handler);
    });

});
