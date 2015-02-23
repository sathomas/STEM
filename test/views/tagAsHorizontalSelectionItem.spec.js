/*global beforeEach, afterEach, describe, it, Stem, $ */

describe('TagAsHorizontalSelectionItem View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tag = new Stem.Models.Tag({label: 'test'});
        this.TagAsHorizontalSelectionView = new Stem.Views.TagAsHorizontalSelectionItem({el: this.$Scaffolding,model: this.Tag});
    });

    afterEach(function() {
        this.TagAsHorizontalSelectionView.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagAsHorizontalSelectionView.render().should.equal(this.TagAsHorizontalSelectionView);
    });

    it('should include a checkbox input element', function() {
        var $el = this.TagAsHorizontalSelectionView.render().$el;
        $el.find('input').attr('type').should.equal('checkbox');
    });

    it('should set the checkbox input status based on the model', function() {
        this.Tag.set('selected', false);
        var $el = this.TagAsHorizontalSelectionView.render().$el;
        $el.find('input').is(':checked').should.be.false();
        this.Tag.set('selected', true);
        this.TagAsHorizontalSelectionView.render();
        $el.find('input').is(':checked').should.be.true();
    });

    it('should include a label', function() {
        var $el = this.TagAsHorizontalSelectionView.render().$el;
        $el.find('label').text().should.equal('test');
        $el.find('label').attr('for').should.equal($el.find('input').attr('id'));
        $el.find('label').hasClass('horizontal-selection__item-label').should.be.true();
    });

    it('should update model based on user interations', function() {
        this.TagAsHorizontalSelectionView.render().$el.find('input').click();
        this.Tag.get('selected').should.be.true();
    });

});
