/*global Stem, Backbone*/

// Backbone collection for a set of content objects from the
// Open Academic Environment.
//
// Unlike typical Backbone collections, the Content collection
// supports a set of options that determine how the collections
// accesses the OAE search API. Those options are passed, in
// a JavaScript object, as the second parameter to the constructor
//
//     var content = new Stem.Collections.Content([], options);
//
// The supported options are:
//
//  - `keywords`: include a keyword search in the request.
//  - `limit`: the maximum number of objects to retrieve for
//     the collection. If unspecified, uses the API's default
//     (currently 12, but may change in the future).

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.Content = Backbone.Collection.extend({

        model: Stem.Models.Content,

        // Since we're accepting options for the collection,
        // we need an `initialize` method to handle them.

        initialize: function(models, options) {

            // The `options` object is optional.

            var settings = options || {};

            // We store the processed values in an
            // `options` property of the collection.

            this.options = {};

            this.options.limit = settings.limit;
            this.options.keywords = settings.keywords;

        },

        // Since we're using a search endpoint instead of Rails CRUD
        // conventions to retrieve the collection, we have to define
        // our own function that returns the URL for the collection.

        url: function() {

            return 'https://' + Stem.config.oaeHost +
                '/api/search/general?resourceTypes=content&scope=_tenant' +
                (this.options.limit    ? ('&' + 'limit=' + this.options.limit)    : '') +
                (this.options.keywords ? ('&' + 'q='     + this.options.keywords) : '');
        },

        // Since we're using a general search query, we have
        // to supply a parse function to extract the actual model
        // information from the response. We also have to account
        // for the possibility of a collection being created
        // directly from an array of models. In the latter case,
        // we _won't_ have to parse anything.

        parse: function(response)  {

            // The search API returns models in the `results`
            // property of the response. If that property
            // exists, return the models it contains. Otherwise
            // we assume that the "response" is already an
            // array of models and return it directly.

            return response.results ? response.results : response;
        }

    });

})();
