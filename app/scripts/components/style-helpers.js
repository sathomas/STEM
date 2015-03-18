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

    // Look for changes to discovery navigation and
    // make those changes visible to CSS.

    $('#discovery-nav').on('change', function() {

        // Use setTimeout to delay processing
        // because some browsers trigger the
        // `change` event before updating the
        // properties of the `<input>` elements.

        setTimeout(function() {
            $('#discovery-nav input[type="radio"]').each(function(idx) {
                if ($(this).is(':checked')) {
                    $('#discovery-nav').attr('data-discovery-nav', idx+1);
                    // Update the URL as well.
                    var hash = $('#discovery-nav ~ article:nth-of-type(' + (idx+1) + ')')
                        .attr('id');
                    history.pushState(null ,$('title').text(), '#' + hash);
                }
            });
        }, 20);

    });

});
