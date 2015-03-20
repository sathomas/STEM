/*global beforeEach, afterEach, describe, it, Stem, $ */

describe('TagSetAsInlineCheckboxGroup View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tags = new Stem.Collections.Tags([
            new Stem.Models.Tag({label: 'subject 1'}),
            new Stem.Models.Tag({label: 'subject 2'})
        ]);
        this.TagSet = new Stem.Models.TagSet({
            tags: this.Tags,
            title: 'title'
        });
        this.TagSetAsInlineCheckboxGroup = new Stem.Views.TagSetAsInlineCheckboxGroup({
            model: this.TagSet,
            el: this.$Scaffolding
        });
    });

    afterEach(function() {
        this.TagSetAsInlineCheckboxGroup.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagSetAsInlineCheckboxGroup.render().should.equal(this.TagSetAsInlineCheckboxGroup);
    });

    it('should enclose the subjects in a form', function() {
        var $el = this.TagSetAsInlineCheckboxGroup.render().$el;
        $el.find('form').length.should.equal(1);
    });

    it('should add a label for the fieldset', function() {
        var $el = this.TagSetAsInlineCheckboxGroup.render().$el;
        $el.find('fieldset > label').first().text().should.equal('title');
    });

    it('should enclose the model views in the fieldset', function() {
        var $el = this.TagSetAsInlineCheckboxGroup.render().$el;
        $el.find('fieldset label').length.should.equal(3);
    });

});
