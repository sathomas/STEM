/*global Stem, Backbone*/

// Trivial model for a group of search results.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.SearchGroup = Backbone.Model.extend({

        defaults: {
            collection: [],
            heading: '',
            moreLink: ''
        }

    });

})();
