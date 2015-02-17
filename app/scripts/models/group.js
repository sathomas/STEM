/*global Stem, Backbone*/

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Group = Backbone.Model.extend({

        url: 'http://stemincubator.oae-qa1.oaeproject.org/api/group/',

        parse: function(response)  {
            return response;
        }
    });

})();
