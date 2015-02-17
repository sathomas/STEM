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
        // to extract the grade level and subject from
        // the overloaded title. While we're at it, we
        // also clean up the response a bit to avoid
        // nasty surprises.

        parse: function(response) {

            // First make sure we have values for all
            // required properties.

            response.description = response.description || '';
            response.displayName = response.displayName || '';

            // Define an array that lists the grade levels
            // we support.

            var allGrades = ['elementary', 'middle', 'high'];

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

                if (tokens.length > 1) {

                    var grades = tokens[1].split(',')
                        .map(function(token) {
                             return token.trim().toLowerCase();
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
                // subjects. Again, there may be
                // multiple subjects separated by
                // commas. This time, though, we're
                // not going to interpret the values.
                // We just store them as an array.

                // To handle the case of no subjects
                // cleanly, start with an empty array.

                response.subjects = [];

                if (tokens.length > 2) {

                    tokens[2].split(',').forEach(function(token) {
                        response.subjects.push(token.trim());
                    });

                }

            }

            return response;

        }

    });

})();
