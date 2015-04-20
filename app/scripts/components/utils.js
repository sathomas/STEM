/*global _, $, Stem */

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

    // Function to convert an OAE path to a full URL.

    Stem.Utils.oaeUrl = function(path) {

        // Many OAE paths are relative URLs that
        // we need to convert to absolute ones
        // since we're referencing them from
        // a different site. Before we do that,
        // though, check to make sure the link
        // isn't already a full URL. (OAE never
        // includes the protocol in a relative
        // URL.)

        if (path.indexOf('http') === 0) {
            return path;
        }

        return Stem.config.oae.protocol + '//' +
               Stem.config.oae.host + path;

    };

    // Asynchronous function to get geo-location
    // information from the client's IP address. Parameters
    // are a success and error callback function.

    Stem.Utils.getLocationFromIp = function(success, error) {

        // If we've already cached the user's information
        // from a previous call or if it's available from
        // some other source (e.g. map API), just return
        // what's available. This will avoid making
        // unnecessary (and potentially costly) API calls
        // to the IP info service.

        if (Stem.user.geo.latitude && Stem.user.geo.longitude) {

            success([
                Stem.user.geo.latitude,
                Stem.user.geo.longitude
            ]);

        } else {

            // Since the info isn't otherwise available,
            // try querying the IP info service.

            $.getJSON('http://ipinfo.io/json')
                .done(function(response) {

                    // The response should contain the
                    // location info. A sample response:
                    //
                    //     {
                    //         ip: "73.54.166.233",
                    //         hostname: "c-73-54-166-233.hsd1.ga.comcast.net",
                    //         city: "Woodstock",
                    //         region: "Georgia",
                    //         country: "US",
                    //         loc: "34.1190,-84.4477",
                    //         org: "AS7922 Comcast Cable Communications, Inc.",
                    //         postal: "30188"
                    //     }

                    var latLong = null;

                    if (response && response.loc &&
                        (latLong = _.chain(response.loc.split(','))
                            .map(function(s) {
                                return parseFloat(s.trim());
                            }).filter(function(x) {
                                return !_.isNaN(x);
                            }).value()) &&
                        (latLong.length === 2)) {

                        // Cache the response info.

                        Stem.user.geo.latitude  = latLong[0];
                        Stem.user.geo.longitude = latLong[1];

                        // Return it to the original
                        // caller via the success callback.

                        success([
                            Stem.user.geo.latitude,
                            Stem.user.geo.longitude
                        ]);

                    } else {

                        // No location info in the
                        // response! All we can do
                        // now is return an error.

                        if (typeof(error) === "function") {
                            error();
                        }

                    }

                })
                .fail(function() {

                    // Looks like we're out of luck.
                    // If the original caller provided
                    // an error callback, execute it.

                    if (typeof(error) === "function") {
                        error();
                    }

                });

        }

    };

    // Asynchronous function to get geo-location
    // information from a street address. Parameters
    // are the address and a success and error callback
    // function.

    Stem.Utils.getLocationFromStreet = function(addr, success, error) {

        // For some reason, the Census Bureau seems to have
        // problems with zip+4 zip codes. So we strip them
        // out here.

        addr = addr.replace(/([0-9]{5})-[0-9]{4}/g, '$1');

        $.ajax({
                url: 'http://geocoding.geo.census.gov/geocoder/locations/onelineaddress?' +
                        'address=' + encodeURIComponent(addr.trim()) +
                        '&benchmark=9&format=jsonp',
                dataType: "jsonp"
            })
            .done(function(response) {

                if (response.result &&
                    response.result.addressMatches &&
                    response.result.addressMatches.length &&
                    response.result.addressMatches[0].coordinates &&
                    response.result.addressMatches[0].coordinates.x &&
                    response.result.addressMatches[0].coordinates.y &&
                    !_.isNaN(parseFloat(response.result.addressMatches[0].coordinates.x)) &&
                    !_.isNaN(parseFloat(response.result.addressMatches[0].coordinates.y))) {

                    success([
                        parseFloat(response.result.addressMatches[0].coordinates.y),
                        parseFloat(response.result.addressMatches[0].coordinates.x)
                    ]);

                } else {

                    // Sometimes the Census Bureau has problems with
                    // NE in the address. (Maybe Nebraska!?) If this
                    // address has it, then strip it out and try again.

                    if (addr.indexOf(' NE ') > 0) {

                        Stem.Utils.getLocationFromStreet(
                            addr.replace(/ NE /, ' '),
                            success,
                            error
                        );

                    // Try the same for NW in the address.

                    } else if (addr.indexOf(' NW ') > 0) {

                        Stem.Utils.getLocationFromStreet(
                            addr.replace(/ NW /, ' '),
                            success,
                            error
                        );

                    } else if (typeof(error) === "function") {

                        error();

                    }

                }

            })
            .fail(function() {

                if (typeof(error) === "function") {
                    error();
                }

            });

    };


})();
