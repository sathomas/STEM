/*global $ */

// Generic JavaScript utilities that enhance the CSS
// styles for the site. The CSS is designed so that
// these functions aren't essential (e.g. for users
// with JavaScript disabled), but they enhance the
// overall experience when available.

// Nothing happens until jQuery says the document is ready.

$(document).ready(function () {
    'use strict';

    // Look for changes to the `nav-toogle` checkbox
    // and update the `main` element with appropriate
    // data attributes. The CSS rules can use these
    // to adjust positioning of the main content to
    // account for expanded or collapsed menu bars on
    // mobile viewports.

    $('#nav-toggle').on('change', function() {

        $('main').attr('data-nav-expanded', $('#nav-toggle').prop('checked'));

    });

});
