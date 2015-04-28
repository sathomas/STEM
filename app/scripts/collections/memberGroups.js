/*global Stem, _, Backbone*/

// Backbone collection for a set of group objects from the
// Open Academic Environment that are members of the
// designated parent group.
//
// Unlike typical Backbone collections, the Groups collection
// supports a set of options that determine how the collections
// accesses the OAE search API. Those options are passed, in
// a JavaScript object, as the second parameter to the constructor
//
//     var content = new Stem.Collections.Groups([], options);
//
// The supported options are:
//
//  - `parentId`: [Required] id of the parent group
//  - `keywords`: include a keyword search in the request.
//  - `limit`: the maximum number of objects to retrieve for
//     the collection. If unspecified, uses the API's default
//     (currently 12, but may change in the future).


Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.MemberGroups = Backbone.Collection.extend({

        model: Stem.Models.Group,

        // Default values for collection options.

        defaults: {

        },

        // Since we're accepting options for the collection,
        // we need an `initialize` method to handle them.

        initialize: function(models, options) {

            // We store the processed values in an
            // `options` property of the collection.

            this._options = _.extend({}, this.defaults, options);

        },

        // Since we're using a search endpoint instead of Rails CRUD
        // conventions to retrieve the collection, we have to define
        // our own function that returns the URL for the collection.

        url: function() {

            return Stem.config.oae.protocol + '//' + Stem.config.oae.host +
                '/api/search/members-library/' + this._options.parentId  + '?scope=_tenant' +
                (this._options.limit    ? ('&' + 'limit=' + this._options.limit)    : '') +
                (this._options.keywords ? ('&' + 'q='     + this._options.keywords) : '');

        },

        // Enhance the normal Backbone `sync` method to gracefully
        // handle multiple pending AJAX requests.

        sync: function(method, model) {

            // Get information about previous AJAX request (if
            // there was one.

            var lastXHR = model._lastXHR && model._lastXHR[method];

            // If the previous AJAX request is still in progress,
            // abort it.

            if (lastXHR && lastXHR.readyState !== 4) {
                lastXHR.abort('stale');
            }

            // Save information about the (soon to be) current
            // AJAX request. First make sure there's a data structure
            // to store it.

            if (!model._lastXHR) {
                model._lastXHR = {};
            }

            // Now execute the regular AJAX request and save the
            // resulting object.

            model._lastXHR[method] = Backbone.sync.apply(this, arguments);

            // Return the normal Backbone.sync return value.

            return model._lastXHR[method];

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
        },

        // Update or return the collection options.

        options: function(options) {

            if (typeof(options) === 'undefined') {
                return this._options;
            }

            _(this._options).extend(options);

            return this;

        }

    });

})();
