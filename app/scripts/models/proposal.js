/*global Stem, Backbone, _*/

/*
 * Backbone model for a single proposal from DonorsChoose.org.
 * Detals for the API and returned JSON object can be found at
 * the [DonorsChoose site](http://data.donorschoose.org/docs/overview/).
 */

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Proposal = Backbone.Model.extend({

        // DonorsChoose doesn't (currently) enable Cross-Origin
        // requests to their API, so we can't use Backbone's
        // built-in AJAX handling. We'll have to override the
        // default `sync` method.

        sync: function(method, model, options) {

            // Although this isn't a big deal, as long as we're
            // overriding the `sync` method, let's go ahead and
            // block any write requests, since the DonorsChoose
            // API is read-only.
            if (method !== 'read') {
                throw 'Attempt to write read-only Proposal model';
            }

            // Fortunately, jQuery has pretty simple support
            // for JSONP and DonorsChoose supports that, so
            // we can take advantage of both. All we have to
            // do is tell jQuery to use JSONP instead of JSON.

            options.dataType = 'jsonp';
            return Backbone.sync(method, model, options);
        },

        // Since DonorsChoose doesn't follow Rails conventiosn, we
        // have to define our own function that returns the URL for
        // a specific model. We also use the function to insert the
        // API key into the URL.

        url: function() {

            // The DonorsChoose URL for a specific proposal is really
            // just a search URL with the keyword `id` set to the
            // proposal's `id` value.

            return 'http://api.donorschoose.org/common/json_feed.html' +
                '?' + 'APIKey=' + Stem.config.donorsChooseApiKey +
                '&' + 'id=' + this.get('id');
        },

        initialize: function() {
        },

        defaults: {
        },

        // Since it's not clear that DonorsChoose will always
        // provide all of the proprosal properties that we need,
        // we'll validate the model. By doing so, we'll effectively
        // ignore any proposals that we can't display.

        validate: function(attrs) {
            if (!_(attrs.title).isString()) {
                return 'Proposal doesn\'t have a valid title';
            }
            if (!_(attrs.imageURL).isString()) {
                return 'Proposal doesn\'t have a valid thumbnail image';
            }
            if (!_(attrs.shortDescription).isString()) {
                return 'Proposal doesn\'t have a valid description';
            }
            if (!_(attrs.schoolName).isString()) {
                return 'Proposal doesn\'t have a valid school';
            }
            if (!_(attrs.city).isString()) {
                return 'Proposal doesn\'t have a valid city';
            }
            if (!_(attrs.fulfillmentTrailer).isString()) {
                return 'Proposal doesn\'t have a valid fulfillment trailer';
            }
            if (!_(attrs.totalPrice).isString()) {
                return 'Proposal doesn\'t have a valid total price';
            }
            if (!_(attrs.costToComplete).isString()) {
                return 'Proposal doesn\'t have a valid cost to complete';
            }
            if (!_(attrs.fulfillmentTrailer).isString()) {
                return 'Proposal doesn\'t have a valid fulfillment trailer';
            }
            if (!_(attrs.proposalURL).isString()) {
                return 'Proposal doesn\'t have a valid proposal URL';
            }
        },

        // Since DonorsChoose doesn't follow Rails conventions, we have
        // to supply a parse function to extract the actual model
        // information from the response.

        parse: function(response)  {

            // Parse can be called in one of two ways. Most commonly
            // it will be called when a collection is fetched from
            // the server. In that case, the collection's AJAX
            // handling will have already stripped away the excess
            // stuff that DonorsChoose adds. We don't need to
            // do any additional processing. If the model is
            // populated directly from the server's response,
            // however, we'll have to deal with that response
            // format. All DonorsChoose responses follow the same
            // format and consist of
            //
            // 1. query metadata
            // 2. an array of `proposals`
            //
            // That's true even in this case when we're requesting a
            // specific proposal. If there's a `proposals` array
            // in the input parameter, we'll assume that the
            // data came directly from the server. Otherwise,
            // we'll assume it's already be re-formatted.

            return response.proposals && _(response.proposals).isArray() ?
                response.proposals[0] : response;
        }
    });

})();
