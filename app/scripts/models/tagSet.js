/* global Stem, Backbone */

// Trivial Backbone model for a set of tags.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.TagSet = Backbone.Model.extend({

        // Define the default properties of a model.
        // By default, no tags are defined.
        
        defaults: {
            tags: [],
            title: 'Tags'
        },
        
        // Define a convenience function to return
        // the set of tags that are currently selected.
        
        getSelectedTags: function() {
            return this.get('tags').getSelectedTags();
        }

    });

})();
