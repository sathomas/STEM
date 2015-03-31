/*global Stem, Backbone*/

// Backbone model to back the discovery view
// part of the landing page. This is not a
// traditional model that's backed by data
// stored on a server. It's just a convenient
// place to store information related to the
// discovery view.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Discovery = Backbone.Model.extend({

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

            // Within the discovery block there are
            // three different perspectives. Set up
            // a new model for each one. Pass in the
            // search query so that all blocks can
            // share the user's active query string.

            this.set('teachers', new Stem.Models.Teachers({
                searchQuery: this.get('searchQuery');
            }));
            this.set('admins',   new Stem.Models.Admins({
                searchQuery: this.get('searchQuery');
            }));
            this.set('partners', new Stem.Models.Partners({
                searchQuery: this.get('searchQuery');
            }));

            // If someone changes our search query,
            // we need to update the child models.

            this.on('set:searchQUery', function() {

                this.get('teachers').set(
                    'searchQuery',
                    this.get('searchQuery')
                );
                this.get('admins').set(
                    'searchQuery',
                    this.get('searchQuery')
                );
                this.get('partners').set(
                    'searchQuery',
                    this.get('searchQuery')
                );

            }, this);

        }

    });

})();
