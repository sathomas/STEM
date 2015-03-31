/*global $, _ */

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

        $('main').attr('data-nav-expanded',
            $('#nav-toggle').prop('checked') ? '1' : '0'
        );

    });

    // Hook the window resize event so that
    // we can update any embedded maps. A bit
    // clunky, but Leaflet doesn't really
    // support flexible layouts very well.
    // We debounce the event since some browsers
    // trigger a flood of `resize` events when
    // the user changes window sizes.

    $(window).on('resize', _.debounce(function() {
        $('.map').each(function() {
            var $el = $(this);
            if ($el.data('map') && $el.data('aspectRatio')) {
                var width = $(window).width() -
                        parseInt($el.css('margin-left')) -
                        parseInt($el.css('margin-right')),
                    height = width * $el.data('aspectRatio');
                $el.css({
                    height: height + 'px',
                    width:  width  + 'px'
                });
                $(this).data('map').invalidateSize(false);
            }
        });
    }, 250));

});
