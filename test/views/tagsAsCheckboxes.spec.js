/*global beforeEach, afterEach, describe, it, Stem, $ */

describe('TagsAsCheckboxes View', function () {
    'use strict';

    beforeEach(function () {
        this.$Scaffolding = $('<div>').addClass('scaffolding').css({'left':'-9999px','position': 'absolute'}).appendTo($('body'));
        this.Tags = new Stem.Collections.Tags([
            new Stem.Models.Tag({label: 'subject 1'}),
            new Stem.Models.Tag({label: 'subject 2'})
        ]);
        this.TagsAsCheckboxes = new Stem.Views.TagsAsCheckboxes({collection: this.Tags,el: this.$Scaffolding});
    });

    afterEach(function() {
        this.TagsAsCheckboxes.remove();
        this.$Scaffolding.remove();
    });

    it('render method should return the view (for chaining)', function() {
        this.TagsAsCheckboxes.render().should.equal(this.TagsAsCheckboxes);
    });

    it('should enclose the model views in the view', function() {
        var $el = this.TagsAsCheckboxes.render().$el;
        $el.find('label').length.should.equal(2);
    });

});
