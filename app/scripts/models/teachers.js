/*global Stem, Backbone*/

// The teachers model tracks information
// needed to present the content
// focused on teachers. (Not the
// teacher results, but the teacher
// content in the landing page discovery
// block.) This model is not a traditional
// Backbone model in that it's not backed
// by a server.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Teachers = Backbone.Model.extend({

        initialize: function () {

            // If no search query was provided when
            // the model was created, we create our
            // own.

            if (!this.get('searchQuery')) {

                var searchQuery = new Stem.Models.Search({
                    label: 'Search for resources',
                    placeholder: 'Search the Incubator'
                });

                this.set('searchQuery',searchQuery);

            }

        }

    });

})();
