/*global Stem, Backbone, _*/

/*
 * Backbone collection for a set of proposals from DonorsChoose.org.
 * Detals for the API and returned JSON object can be found at
 * the [DonorsChoose site](http://data.donorschoose.org/docs/overview/).
 *
 * Unlike typical Backbone collections, the Proposals collection
 * supports a set of options that determine how the collections
 * accesses the DonorsChoose API. Those options are passed, in
 * a JavaScript object, as the second parameter to the constructor
 *
 *     var proposals = new Stem.Collections.Proposals([], options);
 *
 * The supported options are:
 *
 *  - `subject`: the educational subject for proposals. If
 *     unspecified, uses general Math and Science. Supported
 *     values are:
 *       - `"Health & Life Science"`
 *       - `"Applied Science"`
 *       - `"Environmental Science"`
 *       - `"Mathematics"`
 *  - `grade`: the grade level for proposals. If unspecified,
 *     all grade levels are considered. Supported values
 *     are:
 *       - `"primary"`: primary school pre-K to 2nd grade
 *       - `"elementary"`: elemenrary school (grades 3 to 5)
 *       - `"middle"`: middle school (grades 6 to 8)
 *       - `"high"`: high school
 *       - `"adult"`: adult
 *  - `keywords`: include a keyword search in the request.
 *  - `maxSize`: the maximum number of proposals to retrieve for
 *     the collection. If unspecified, uses the API's default
 *     (currently 10, but may change in the future). The API
 *     also places a limit on this parameter. (Currently the
 *     limit is 50.)
 *  - `sortBy`: define the sorting criteria for the request.
 *     If unspecified, the API's default sorting is retained.
 *     Supported values are:
 *       - `"urgency"`
 *       - `"poverty"`
 *       - `"cost"`
 *       - `"popularity"`
 *       - `"expiration"`
 *       - `"newest"`
 */

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.Proposals = Backbone.Collection.extend({

        model: Stem.Models.Proposal,

        // Since we're accepting options for the collection,
        // we need an `initialize` method to handle them.

        initialize: function(models, options) {

            // The ' object is optional.

            var settings = options || {};

            // We store the processed values in an
            // `options` property of the collection.

            this.options = {};

            // Extract supported option values

            var subjects = {
                'Health & Life Science': '4',
                'Applied Science':       '6',
                'Environmental Science': '7',
                'Mathematics':           '8'
            };

            if (settings.subject && subjects[settings.subject]) {

                this.options.subject = subjects[settings.subject];

            } else {

                // If no subject is specified, default to
                // general math and science.

                this.options.subject = '-4';
            }

            var grades = {
                'primary':    '1',
                'elementary': '2',
                'middle':     '3',
                'high':       '4',
                'adult':      '5'
            };

            if (settings.grade && grades[settings.grade]) {
                this.options.grade = grades[settings.grade];
            }

            var sortBy = {
                'urgency':    '0',
                'poverty':    '1',
                'cost':       '2',
                'popularity': '4',
                'expiration': '5',
                'newest':     '7'
            };

            if (settings.sortBy && sortBy[settings.sortBy]) {
                this.options.sortBy = sortBy[settings.sortBy];
            }
            this.options.maxSize = settings.maxSize;
            this.options.keywords = settings.keywords;

        },

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

            return 'http://api.donorschoose.org/common/json_feed.html' +
                '?' + 'APIKey=' + Stem.config.donorsChooseApiKey +
                '&' + 'state=GA' +
                '&' + 'subject4=' + this.options.subject +
                (this.options.grade    ? ('&' + 'gradeType=' + this.options.grade) : '') +
                (this.options.keywords ? ('&' + 'keywords="' + encodeURIComponent(this.options.keywords) + '"') : '') +
                (this.options.maxSize  ? ('&' + 'max=' + this.options.maxSize) : '') +
                (this.options.sortBy   ? ('&' + 'sortBy=' + this.options.sortBy) : '');
        },

        // When fetching a collection from the server, Backbone
        // does not, by default, validate the models in the returned
        // response (since it assumes the server is always valid).
        // We, however, use validation to filter out models that aren't
        // appropriate for our application. For example we use
        // validation to remove proposals that are for `"adult"`
        // classes since those don't fit with a K-12 incubator.
        // To force model validation, we override the standard
        // `fetch` method.

        fetch: function(options) {

            // Make sure that `validate` is true in the
            // options passed to the standard `fetch` method.

            return Backbone.Collection.prototype.fetch.call(
                this,
                _({}).extend(options, {validate: true})
            );
        },

        // Since DonorsChoose doesn't follow Rails conventions, we have
        // to supply a parse function to extract the actual model
        // information from the response.

        parse: function(response)  {

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
