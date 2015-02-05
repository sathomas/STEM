/*global Stem, Backbone*/

/*
 * Backbone collection for a set of proposals from DonorsChoose.org.
 * Detals for the API and returned JSON object can be found at
 * the [DonorsChoose site](http://data.donorschoose.org/docs/overview/).
 */

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.Proposals = Backbone.Collection.extend({

        model: Stem.Models.Proposal,

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
                throw 'Attempt to write read-only Proposals collection';
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
        // the collection. We also use the function to insert the
        // API key into the URL.

        url: function() {

            // The DonorsChoose URL for a specific proposal is really
            // just a search URL. We include some fixed filters that
            // will apply for all searches.

            return 'http://api.donorschoose.org/common/json_feed.html'
                + '?' + 'APIKey=' + Stem.config.donorsChooseApiKey
                + '&' + 'state=GA'       // restrict to Georgia
                + '&' + 'subject4=-4';   // restrict to Math/Science
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
            // We simply need to extract the proposals array.
            // (There's no real benefit to checking for errors,
            // since Backbone can cope with undefined or non-array
            // returns.)

            return response.proposals;
        }

    });

})();
