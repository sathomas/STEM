/* global Stem, Backbone */

// Trivial Backbone model for a subject.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Subject = Backbone.Model.extend({

        // Define the default properties of a model.
        
        defaults: {
            selected: false
        },

    });

})();
