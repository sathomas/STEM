/*global Stem, Backbone*/

// Backbone model for a single content object from the
// Open Academic Environment.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Content = Backbone.Model.extend({

        // The only thing we need to provide for this
        // model (other than Backbone defaults) is the
        // URL to access it. Unlike typical Backbone
        // implementations, it's more likely that any
        // collections of this model will be acquired
        // through a different REST endpoint (e.g.
        // search). We define the REST endpoint for the
        // full content object in case those other
        // endpoints only provide a summary. In such
        // cases, calling `fetch()` on a model will
        // update it with the complete profile.

        url: function() {
            return 'https://' + Stem.config.oaeHost + '/api/content/' + this.id;
        }

    });

})();
