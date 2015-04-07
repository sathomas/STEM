/*global Stem, Backbone*/

// Trivial Backbone model to track search input.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Search = Backbone.Model.extend({

        // Define the default properties of a model.

        defaults: {
            label: '',
            placeholder: '',
            query: ''
        }

    });

})();
