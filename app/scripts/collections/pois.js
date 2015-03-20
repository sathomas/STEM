/*global Stem, Backbone*/

// Trivial backbone model for a set of points
// of interest (as on a map).

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.Pois = Backbone.Collection.extend({

        model: Stem.Models.Poi

    });

})();
