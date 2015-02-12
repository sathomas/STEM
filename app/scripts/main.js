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
        // Nothing to do yet
    }
};

$(document).ready(function () {
    'use strict';
    Stem.init();
});

window.addEventListener('load', function() {
    'use strict';
    var navToggle = document.getElementById('nav-toggle'),
        main = document.getElementsByTagName('main')[0];
    navToggle.addEventListener('change', function() {
        main.classList.toggle('nav-expanded');
    });
});

