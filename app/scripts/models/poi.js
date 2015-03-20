/*global Stem, Backbone*/

// Trivial backbone model for a point of interest
// (as on a map).

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Poi = Backbone.Model.extend({

        defaults: {
            className: '',
            imageUrl:  '',
            latitude:  Stem.config.geo.latitude,
            link:      '',
            longitude: Stem.config.geo.longitude,
            title:     ''
        }

    });

})();
