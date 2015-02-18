/*global beforeEach, afterEach, describe, it, sinon, Stem, $ */

describe('SubjectAsSelectionItem View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Subject = new Stem.Models.Subject({id: '1',subject: 'test'});
        this.SubjectAsSelectionItemView = new Stem.Views.SubjectAsSelectionItem({el: this.$Scaffolding,model: this.Subject});
    });

    afterEach(function() {
        this.SubjectAsSelectionItemView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.SubjectAsSelectionItemView.render().should.equal(this.SubjectAsSelectionItemView);
    });

    it('should include a checkbox input element', function() {
        var $el = this.SubjectAsSelectionItemView.render().$el;
        $el.find('input').attr('type').should.equal('checkbox');
        $el.find('input').attr('id').should.equal('1');
    });

    it('should set the checkbox input status based on the model', function() {
        this.Subject.set('selected', false);
        var $el = this.SubjectAsSelectionItemView.render().$el;
        $el.find('input').is(':checked').should.be.false();
        this.Subject.set('selected', true);
        this.SubjectAsSelectionItemView.render();
        $el.find('input').is(':checked').should.be.true();
    });

    it('should include a label', function() {
        var $el = this.SubjectAsSelectionItemView.render().$el;
        $el.find('label').text().should.equal('test');
        $el.find('label').attr('for').should.equal('1');
        $el.find('label').hasClass('vertical-selection__item-label').should.be.true();
    });

    it('should update model based on user interations', function() {
        this.SubjectAsSelectionItemView.render().$el.find('input').click();
        this.Subject.get('selected').should.be.true();
    });

    it('should trigger a change event on user interations', function() {
        var spy = sinon.spy();
        this.SubjectAsSelectionItemView.on('selection:change', spy);
        this.SubjectAsSelectionItemView.render().$el.find('input').click();
        spy.callCount.should.equal(1);
        spy.getCall(0).args[0].should.equal(this.Subject);
        spy.getCall(0).args[1].should.be.true();
        this.SubjectAsSelectionItemView.off('selection:change');
    });

});
