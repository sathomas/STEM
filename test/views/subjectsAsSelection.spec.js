/*global beforeEach, afterEach, describe, it, sinon, Stem, $ */

describe('SubjectsAsSelection View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Subjects = new Stem.Collections.Subjects([
                new Stem.Models.Subject({id: 1, subject: 'subject 1'}),
                new Stem.Models.Subject({id: 2, subject: 'subject 2'})
        ]);
        this.SubjectsAsSelectionView = new Stem.Views.SubjectsAsSelection({collection: this.Subjects,el: this.$Scaffolding});
    });

    afterEach(function() {
        this.SubjectsAsSelectionView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.SubjectsAsSelectionView.render().should.equal(this.SubjectsAsSelectionView);
    });

    it('should enclose the subjects in a form', function() {
        var $el = this.SubjectsAsSelectionView.render().$el;
        $el.find('form').hasClass('vertical-selection').should.be.true();
    });

    it('should add a label for the fieldset', function() {
        var $el = this.SubjectsAsSelectionView.render().$el;
        $el.find('fieldset > label').first().hasClass('vertical-selection__label').should.be.true();
    });

    it('should enclose the model views in the fieldset', function() {
        var $el = this.SubjectsAsSelectionView.render().$el;
        $el.find('fieldset label:not(.vertical-selection__label)').length.should.equal(2);
    });

    it('should trigger a change event on the collection on user interations', function() {
        var spy = sinon.spy();
        this.Subjects.on('selection:change', spy);
        var $el = this.SubjectsAsSelectionView.render().$el;
        $el.find('input').first().click();
        spy.callCount.should.equal(1);
        spy.getCall(0).args[0].should.deep.equal(['subject 1']);
        this.Subjects.off('selection:change');
    });

});
