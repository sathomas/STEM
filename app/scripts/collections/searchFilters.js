/*global Stem, Backbone*/

// Trivial Backbone collection for list of search filters.

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.SearchFilters = Backbone.Collection.extend({

        model: Stem.Models.SearchFilter,

        initialize: function () {

            // If any of the models in the collection
            // change, we  want to know about it.

            this.on('change', this.changed, this);

        },

        changed: function (filter) {

            // If the selected state changed, we may
            // need to update other models in the
            // collection.

            if (filter.changedAttributes('selected')) {

                // Only one filter can be selected at
                // a time, so if the change selected
                // one model, de-select all the others.

                if (filter.get('selected')) {

                    this.reject(function(model) {
                        return model === filter;
                    }).forEach(function(model){
                        model.set('selected',false);
                    });

                }

            }

        }

    });

})();
