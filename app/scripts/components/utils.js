/*global Stem */

// Generic JavaScript utilities that aren't part of
// any model, view, collection, etc.

Stem.Utils = Stem.Utils || {};

(function () {
    'use strict';

    // Simple function to redirect to a new URL.

    Stem.Utils.redirect = function(path, _blank) {
        if (path) {
            if (_blank) {
                window.open(path);
            }
            window.location = path;
        }
    };


})();
