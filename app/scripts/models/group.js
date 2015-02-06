/*global Stem, Backbone*/

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Group = Backbone.Model.extend({

        url: 'https://stemincubator.oaeproject.org/api/group/',

        parse: function(response)  {
            return response;
        }
    });

})();
