/* global Stem, Backbone */

// Trivial Backbone model for a tag.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Tag = Backbone.Model.extend({

        // Define the default properties of a model.
        
        defaults: {
            selected: false
        }

    });

})();
