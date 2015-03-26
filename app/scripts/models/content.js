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
            return Stem.config.oae.protocol + '//' +
                   Stem.config.oae.host + '/api/content/' + this.id;
        },

        // We need to parse the response from the server
        // to extract the grade level and tags from
        // the overloaded title. While we're at it, we
        // also clean up the response a bit to avoid
        // nasty surprises.

        parse: function(response) {

            // Some OAE APIs return the model directly
            // while others bury it in the `results`
            // property. Also, some responses put the
            // group information inside a 'profile`
            // attribute. Our first task is to find the
            // actual group information.

            if (response.results) {
                response = response.results;
            }

            if (response.profile) {
                response = response.profile;
            }

            response.description  = response.description  || '';
            response.displayName  = response.displayName  || '';
            response.thumbnailUrl = response.thumbnailUrl || '';
            response.profilePath  = response.profilePath  || '';

            // If there isn't a real thumbnail URL but there
            // is a small picture, use it as an alternative.

            if (!response.thumbnailUrl && response.picture &&
                response.picture.small) {

                response.thumbnailUrl = response.picture.small;

            }

            return response;

        }

    });

})();
