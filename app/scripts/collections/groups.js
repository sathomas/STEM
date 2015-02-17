/*global Stem, Backbone*/

/*
 * Backbone collection for a set of groups from OAE.
 * Details for the API and returned JSON object can be found at
 * the [OAE site](https://stemincubator.oaeproject.org/docs/rest).
 */

Stem.Collections = Stem.Collections || {};

(function () {
    'use strict';

    Stem.Collections.Groups = Backbone.Collection.extend({

        model: Stem.Models.Group,

        // We'll get OAE groups by searching for 20 of them in our tenant
        url: 'http://stemincubator.oae-qa1.oaeproject.org/api/search/general?limit=20&q=&resourceTypes=group&scope=_tenant',

        // Since OAE doesn't follow Rails conventions, we have
        // to supply a parse function to extract the actual model
        // information from the response.

        parse: function(response)  {

            // All OAE responses follow the same format and
            // consist of
            //
            // 1. a total for paging purposes
            // 2. an array of `Groups`
            //
            // We simply need to extract the Groups array.
            // (There's no real benefit to checking for errors,
            // since Backbone can cope with undefined or non-array
            // returns.)

            return response.results;
        }

    });

})();
