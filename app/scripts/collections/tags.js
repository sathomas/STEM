/* global Stem, Backbone */

// Trivial Backbone collection for list of tags.

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.Tags = Backbone.Collection.extend({

        model: Stem.Models.Tag,

        // Define a convenience function to return
        // the set of tags that are currently selected.

        getSelectedTags: function() {
            return this.filter(function(model) {
                return model.get('selected');
            }).map(function(model) {
                return model.get('label');
            });
        }

    });

})();
