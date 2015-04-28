/*global Stem, Backbone*/

// The admins model tracks information
// needed to present the content
// focused on administrators. It's
// not a traditional Backbone model
// in that it's not backed by a
// server.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Admins = Backbone.Model.extend({

        setupCertifications: function () {

            // Certifications are schools that have
            // achieved STEM certification. We show
            // them on a map, so we'll need point
            // of interest information for them.
            // Normally, we create the POI collection,
            // but we allow it to be passed into
            // the model during creation for
            // flexibility and testing.

            if (!this.get('certificationPois')) {
                this.set('certificationPois',
                    new Stem.Collections.Pois()
                );
            }

            if (!this.get('certifications')) {
                this.set('certifications',
                    new Stem.Collections.SubGroups([], {
                        limit: 50,
                        parentId: Stem.config.oae.groups.certifications
                    })
                );
            }

            // Use a local variable for convenience.

            var certifications = this.get('certifications');

            // Before we fetch the data from the OAE,
            // set up a handler to deal with additions
            // to the collection.

            certifications.on('add', this.certificationAdded, this);

            // If the collection was supplied on model
            // creation, it already has members, so
            // simply add them. If the collection is
            // empty, then we fetch it from the OAE.

            if (certifications.length > 0) {
                certifications.each(_(this.certificationAdded).bind(this));
            } else {
                certifications.fetch({validate: true});
            }

        },

        certificationAdded: function (group) {

            // Look for an explicit latitude/longitude
            // or a street address in the group's
            // description.

            if (group.get('description')) {
                
                var descLines = _(group.get('description').split('\n'))
                    .map(function(line) {
                        return line.trim();
                    });

                var geoLines = _(descLines).filter(function(line) {
                        return (line.indexOf('latlong:') === 0) ||
                               (line.indexOf('Latlong:') === 0) ||
                               (line.indexOf('LatLong:') === 0) ||
                               (line.indexOf('LATLONG:') === 0);
                    });

                var addrLines = _(descLines).filter(function(line) {
                        return (line.indexOf('address:') === 0) ||
                               (line.indexOf('Address:') === 0) ||
                               (line.indexOf('ADDRESS:') === 0);
                    });

                // If we found lat/long in the
                // description, we're in business.

                if (geoLines.length) {

                    var latLong = _(geoLines[0].substr(8).trim().split(','))
                        .map(function(coords) {
                            return parseFloat(coords);
                        });
                    
                    this.get('certificationPois').add(
                        new Stem.Models.Poi({
                            className: 'theme-2',
                            imageUrl:  Stem.Utils.oaeUrl(group.get('thumbnailUrl')),
                            latitude:  latLong[0],
                            link:      Stem.Utils.oaeUrl(group.get('profilePath')),
                            longitude: latLong[1],
                            title:     group.get('displayName')
                        })
                    );
                
                // No explicit lat/long; how about a
                // street address?
                    
                } else if (addrLines.length) {

                    // Use a network service to retrieve
                    // geographic coordinates from a
                    // street address.

                    Stem.Utils.getLocationFromStreet(
                        addrLines[0].substr(8).trim(),
                        _.bind(function (latLong) {

                            this.get('certificationPois').add(
                                new Stem.Models.Poi({
                                    className: 'theme-2',
                                    imageUrl:  Stem.Utils.oaeUrl(group.get('thumbnailUrl')),
                                    latitude:  latLong[0],
                                    link:      Stem.Utils.oaeUrl(group.get('profilePath')),
                                    longitude: latLong[1],
                                    title:     group.get('displayName')
                                })
                            );

                        }, this)

                    );

                }

            }

        },

        setupSpotlights: function () {

            // Spotlights are featured schools
            // that have achieved STEM
            // certification. We access them
            // as sub-groups on the OAE.
            // All we need to do for set up is
            // define the collection and initiate
            // a fetch. As with other collections,
            // we permit the collection to be
            // specified when the model is
            // created.

            if (!this.get('spotlights')) {
                this.set('spotlights',
                    new Stem.Collections.SubGroups([], {
                        limit: 10,
                        parentId: Stem.config.oae.groups.featuredSchools
                    })
                );
            }

            var spotlights = this.get('spotlights');

            // If the collection is empty (i.e.
            // not supplied in the model's
            // creation), fetch it from the OAE.

            if (spotlights.length === 0) {
                spotlights.fetch({validate: true});
            }

        },

        // Model initialization.

        initialize: function () {

            // Set up the individual parts of the model.

            this.setupCertifications();
            this.setupSpotlights();

        }

    });

})();
