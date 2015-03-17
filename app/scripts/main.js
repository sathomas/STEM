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

    // Global configuration items are defined in the
    // `config` property. Sensitive data (e.g. production
    // API keys) should not be specified here, but,
    // rather, set in the `keys.js` file which is
    // excluded from the public repository.

    config: {

        // Demo key for DonorsChoose; replaced by
        // production key in `keys.js`.

        donorsChooseApiKey: 'DONORSCHOOSE',

        // OAE configuration. Host and protocol are
        // split to allow easy switching between
        // secure and non-secure (i.e. demo) version.

        oae: {
            host: 'stemincubator.oae-qa1.oaeproject.org',
            protocol: 'http:'
        }
    },

    // The `init()` function is called when it's time
    // to start the application.

    init: function () {
        'use strict';

        // Make sure the App object is defined. If it is,
        // create one. It handles everything from there.

        if (this.Routers && this.Routers.App) {
            new this.Routers.App();
        }

    }

};

// Wait for jQuery's `ready` event to start the application.

$(document).ready(function () {
    'use strict';
    Stem.init();
});

