/*global beforeEach, describe, it, Stem */

describe('SubjectsAsSelection View', function () {
    'use strict';

    beforeEach(function () {
        this.SubjectsAsSelectionView = new Stem.Views.SubjectsAsSelection({
            collection: new Stem.Collections.Subjects([
                new Stem.Models.Subject({id: 1, subject: 'subject 1'}),
                new Stem.Models.Subject({id: 2, subject: 'subject 2'})
            ])
        });
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

});
