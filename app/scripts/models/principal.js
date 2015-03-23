/*global Stem, Backbone*/

// Backbone model for a single group or user object from the
// Open Academic Environment.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Principal = Backbone.Model.extend({

        // Unlike (some) more traditional Backbone
        // implementations, it's more likely that any
        // collections of this model will be acquired
        // through a different REST endpoint (e.g.
        // search). We define the REST endpoint for the
        // full principal object in case those other
        // endpoints only provide a summary. In such
        // cases, calling `fetch()` on a model will
        // update it with the complete profile.

        url: function() {
            return Stem.config.oae.protocol + '//' +
                   Stem.config.oae.host + '/api/' +
                   this.get('resourceType') +
                   '/' + this.id;
        },

        // Since it's possible that we may have
        // fetched this object from an API that
        // returns general OAE objects (i.e. not
        // just principal) define a method to make
        // sure this really is a group or a user.

        validate: function(attrs) {
            if (attrs.resourceType !== 'group' &&
                attrs.resourceType !== 'user') {
                return 'Resource is not a group or user';
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

            // Define an array that lists the grade levels
            // we support.

            var allGrades = ['primary', 'elementary', 'middle', 'high'];

            // The extra information is contained in the
            // `displayName` property.

            if (response.displayName) {

                // First, split `displayName` up by
                // dashes.

                var tokens = response.displayName.split(' - ')
                    .map(function(token) {
                         return token.trim();
                    });

                // The real `displayName` is the first of
                // these tokens.

                response.displayName = tokens[0];

                // The second part of the original
                // `displayName` holds the grade
                // levels. Multiple grade levels are
                // permitted, separated by commas.
                // We also replace common abbreviations
                // with the more descriptive version to
                // match the model properties.

                if (tokens.length > 1) {

                    var grades = tokens[1].split(',')
                        .map(function(token) {
	                        token = token.trim().toLowerCase();
	                        if (token === 'k-2')       { token = 'primary';    }
	                        else if (token === '3-5')  { token = 'elementary'; }
	                        else if (token === '6-8')  { token = 'middle';     }
	                        else if (token === '9-12') { token = 'high';       }
                            return token;
                        });

                    // We're pretty forgiving about how
                    // the grade levels are formatted.
                    // We look for any fragment that
                    // matches the relevant keyword.

                    allGrades.forEach(function(grade) {
                        response[grade] = grades
                            .some(function(token) {
                                return token.indexOf(grade) !== -1;
                            });
                    });

                }

                // If no grades were specified, then
                // the content is considered tagged for
                // all grades.

                if (!allGrades.some(function(grade) {
                    return response[grade];
                })) {
                    allGrades.forEach(function(grade) {
                        response[grade] = true;
                    });
                }

                // Finally, the third part of the
                // original `displayName` holds the
                // tags. Again, there may be
                // multiple tags separated by
                // commas. This time, though, we're
                // not going to interpret the values.
                // We just store them as an array.

                // To handle the case of no tags
                // cleanly, start with an empty array.

                response.tags = [];

                if (tokens.length > 2) {

                    tokens[2].split(',').forEach(function(token) {
                        response.tags.push(token.trim());
                    });

                }

            }

            return response;

        }

    });

})();
