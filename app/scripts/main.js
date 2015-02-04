/*global Stem, $*/


window.Stem = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    config: {
        donorsChooseApiKey: 'DONORSCHOOSE'
    },
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    'use strict';
    Stem.init();
});
