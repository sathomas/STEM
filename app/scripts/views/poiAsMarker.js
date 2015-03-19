/*global Stem, Backbone, JST*/

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.PoiAsMarker = Backbone.View.extend({

        template: JST['app/scripts/templates/poiAsMarker.ejs'],

        className: 'poi-popup',

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this; // for method chaining
        }

    });

})();
