/*global Stem, Backbone*/

// Backbone model for a single group object from the
// Open Academic Environment.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Group = Backbone.Model.extend({

        // Unlike (some) more traditional Backbone
        // implementations, it's more likely that any
        // collections of this model will be acquired
        // through a different REST endpoint (e.g.
        // search). We define the REST endpoint for the
        // full group object in case those other
        // endpoints only provide a summary. In such
        // cases, calling `fetch()` on a model will
        // update it with the complete profile.

        url: function() {
            return Stem.config.oae.protocol + '//' +
                   Stem.config.oae.host + '/api/group/' + this.id;
        },

        // Since it's possible that we may have
        // fetched this object from an API that
        // returns general OAE objects (i.e. not
        // just groups) define a method to make
        // sure this really is a group.

        validate: function(attrs) {
            if (attrs.resourceType !== 'group') {
                return 'Resource is not a group';
            }
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

            // Make sure we have defined values for all
            // required properties.

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

            // If we still don't have a thumbnail, substitute
            // a generic image.

            if (!response.thumbnailUrl) {

                // Note that we have to make this a full URL
                // to prevent view templates from assuming
                // the link is to the OAE.

                response.thumbnailUrl = location.protocol +
                    '//' + location.host + '/images/group.png';

            }

            // Use the thumbnail for other pictures if
            // none are available.

            response.picture = response.picture || {};
            response.picture.small = response.picture.small ||
                response.thumbnailUrl;
            response.picture.medium = response.picture.medium ||
                response.thumbnailUrl;
            response.picture.large = response.picture.large ||
                response.thumbnailUrl;

            return response;

        }

    });

})();
