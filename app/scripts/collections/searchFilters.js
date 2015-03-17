/*global Stem, Backbone*/

// Trivial Backbone collection for list of search filters.
// The stock Backbone collection is sufficient, so
// there's actually no code needed here. We just define
// the collection so it can be used in views.

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.SearchFilters = Backbone.Collection.extend({

        model: Stem.Models.SearchFilter

    });

})();
