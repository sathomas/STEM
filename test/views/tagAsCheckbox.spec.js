/*global beforeEach, afterEach, describe, it, Stem, $ */

describe('TagAsCheckbox View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tag = new Stem.Models.Tag({label: 'test', theme: 'theme-1'});
        this.TagAsCheckboxView = new Stem.Views.TagAsCheckbox({el: this.$Scaffolding,model: this.Tag});
    });

    afterEach(function() {
        this.TagAsCheckboxView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagAsCheckboxView.render().should.equal(this.TagAsCheckboxView);
    });

    it('should include a checkbox input element', function() {
        var $el = this.TagAsCheckboxView.render().$el;
        $el.find('input').attr('type').should.equal('checkbox');
    });

    it('should set the checkbox input status based on the model', function() {
        this.Tag.set('selected', false);
        var $el = this.TagAsCheckboxView.render().$el;
        $el.find('input').is(':checked').should.be.false();
        this.Tag.set('selected', true);
        this.TagAsCheckboxView.render();
        $el.find('input').is(':checked').should.be.true();
    });

    it('should include a label', function() {
        var $el = this.TagAsCheckboxView.render().$el;
        $el.find('label').text().should.equal('test');
        $el.find('label').attr('for').should.equal($el.find('input').attr('id'));
    });

    it('should theme the checkbox', function() {
        var $el = this.TagAsCheckboxView.render().$el;
        $el.hasClass(this.Tag.get('theme')).should.be.true();
    });

    it('should update model based on user interations', function() {
        this.TagAsCheckboxView.render().$el.find('input').click();
        this.Tag.get('selected').should.be.true();
    });

});
