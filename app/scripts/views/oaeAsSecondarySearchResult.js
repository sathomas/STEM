/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsSecondarySearchResult = Backbone.View.extend({

        template: JST['app/scripts/templates/oaeAsSecondarySearchResult.ejs'],

        tagName: 'li',

        className: 'results-secondary__item',

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this; // for method chaining
        }

    });

})();
