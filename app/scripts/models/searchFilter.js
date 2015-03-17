/*global Stem, Backbone*/

// Trivial Backbone model for a search filter.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.SearchFilter = Backbone.Model.extend({

        // Define the default properties of a model.

        defaults: {
            icon: '',
            selected: false,
            tagSet: {},
            title: ''
        }

    });

})();
