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
            this.set('partners', new Stem.Models.Partners());
        }

    });

})();
