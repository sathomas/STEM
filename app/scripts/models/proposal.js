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

        sync: function(method, collection, options) {

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
            return Backbone.sync(method, collection, options);
        },

        // Since DonorsChoose doesn't follow Rails conventiosn, we
        // have to define our own function that returns the URL for
        // a specific model.

        url: function() {

            // The DonorsChoose URL for a specific proposal is really
            // just a search URL with the keyword `id` set to the
            // proposal's `id` value.

            return 'http://api.donorschoose.org/common/json_feed.html'
                + '?' + 'APIKey=' + Stem.config.donorsChooseApiKey
                + '&' + 'id=' + this.get('id');
        },

        initialize: function() {
        },

        defaults: {
        },

        // Since it's not clear that DonorsChoose will always
        // provide all of the proprosal properties that we need,
        // we'll validate the model. By doing so, we'll effectively
        // ignore any proposals that we can't display.

        validate: function(attrs, options) {
            if (!_(attrs.title).isString()) {
                return "Proposal doesn't have a valid title";
            }
            if (!_(attrs.thumbImageURL).isString()) {
                return "Proposal doesn't have a valid thumbnail image";
            }
            if (!_(attrs.shortDescription).isString()) {
                return "Proposal doesn't have a valid description";
            }
            if (!_(attrs.schoolName).isString()) {
                return "Proposal doesn't have a valid school";
            }
            if (!_(attrs.city).isString()) {
                return "Proposal doesn't have a valid city";
            }

        },

        // Since DonorsChoose doesn't follow Rails conventions, we have
        // to supply a parse function to extract the actual model
        // information from the response.

        parse: function(response, options)  {

            // All DonorsChoose responses follow the same format and
            // consist of
            //
            // 1. query metadata
            // 2. an array of `proposals`
            //
            // That's true even in this case when we're requesting a
            // specific proposal. For robustness, we'll make sure that
            // the response is formatted as we expect. If it isn't,
            // we return an empty object; the `validate` function can
            // then detect the error.

            return response.proprosals
                && _(response.proprosals).isArray()
                && response.proposals.length ?
                    response.proposals[0] : {};
        }
    });

})();
