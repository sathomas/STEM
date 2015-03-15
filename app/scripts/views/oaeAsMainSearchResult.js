/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.OaeAsMainSearchResult = Backbone.View.extend({

        template: JST['app/scripts/templates/oaeAsMainSearchResult.ejs'],

        tagName: 'li',

        className: 'results-main__item',

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this; // for method chaining
        }

    });

})();
