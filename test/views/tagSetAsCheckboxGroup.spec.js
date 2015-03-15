/*global beforeEach, afterEach, describe, it, Stem, $ */

describe('TagSetAsCheckboxGroup View', function () {
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
        this.TagSetAsCheckboxGroup = new Stem.Views.TagSetAsCheckboxGroup({
            model: this.TagSet,
            el: this.$Scaffolding
        });
    });

    afterEach(function() {
        this.TagSetAsCheckboxGroup.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagSetAsCheckboxGroup.render().should.equal(this.TagSetAsCheckboxGroup);
    });

    it('should enclose the subjects in a form', function() {
        var $el = this.TagSetAsCheckboxGroup.render().$el;
        $el.find('form').length.should.equal(1);
    });

    it('should add a label for the fieldset', function() {
        var $el = this.TagSetAsCheckboxGroup.render().$el;
        $el.find('fieldset > label').first().text().should.equal('title:');
    });

    it('should enclose the model views in the fieldset', function() {
        var $el = this.TagSetAsCheckboxGroup.render().$el;
        $el.find('fieldset label').length.should.equal(3);
    });

});
