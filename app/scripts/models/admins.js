/*global Stem, Backbone*/

// The admins model tracks information
// needed to present the content
// focused on administrators. It's
// not a traditional Backbone model
// in that it's not backed by a
// server.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Admins = Backbone.Model.extend({

        // For now, the vanilla Backbone model
        // is all we need, so there's no code
        // specific to admins.

    });

})();
