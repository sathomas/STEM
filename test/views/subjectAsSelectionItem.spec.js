/*global beforeEach, describe, it, Stem */

describe('SubjectAsSelectionItem View', function () {
    'use strict';

    beforeEach(function () {
        this.SubjectAsSelectionItemView = new Stem.Views.SubjectAsSelectionItem({
            model: new Stem.Models.Subject({
                id: '1',
                subject: 'test'
            })
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.SubjectAsSelectionItemView.render().should.equal(this.SubjectAsSelectionItemView);
    });

    it('should include a checkbox input element', function() {
        var $el = this.SubjectAsSelectionItemView.render().$el;
        $el.find('input').attr('type').should.equal('checkbox');
        $el.find('input').attr('id').should.equal('1');
    });

    it('should include a label', function() {
        var $el = this.SubjectAsSelectionItemView.render().$el;
        $el.find('label').text().should.equal('test');
        $el.find('label').attr('for').should.equal('1');
        $el.find('label').hasClass('vertical-selection__item-label').should.be.true();
    });

});
