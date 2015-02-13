/*global Stem, $*/

// Main JavaScript file for STEM Incubator site. Code in
// this file mostly just sets things up for the app and
// then launches it. This file also includes configuration
// information.

// Everything in the application is namespaced under the
// global variable `Stem`. Invidual components (e.g. models,
// views, collections, etc.) add themselves to this
// namespace as part of their definition.

window.Stem = {
    Collections: {},
    Models: {},
    Routers: {},
    Views: {},

    // Global configuration items (e.g. API keys) are
    // defined in the `config` property.

    config: {
        donorsChooseApiKey: 'DONORSCHOOSE'
    },

    // The `init()` function is called when it's time
    // to start the application.

    init: function () {
        'use strict';
        // Nothing to do yet
    }
};

// Wait for jQuery's `ready` event to start the application.

$(document).ready(function () {
    'use strict';
    Stem.init();
});

