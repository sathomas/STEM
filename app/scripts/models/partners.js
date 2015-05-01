/*global Stem, _, Backbone*/

// The partners model encapsulates information
// about partnerships between schools and
// businessses.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Partners = Backbone.Model.extend({

        setupOrganizations: function () {

            // Organizations are schools or businesses
            // looking for partnerships. We create a
            // collection to store them as points of
            // interest. We'll build that collection
            // from two general subGroup collections from
            // the OAE.

            // For all of the collections below, we
            // check to see if one already exists (e.g.
            // was provided when this model was
            // created). Although mainly for ease of
            // unit testing, this may come in handy
            // in the future, if, e.g. different parts
            // of the site want to re-use the same
            // collection(s).

            if (!this.get('organizationPois')) {
                this.set('organizationPois',
                    new Stem.Collections.Pois()
                );
            }

            if (!this.get('organizations')) {
                this.set('organizations',
                    new Stem.Collections.SubGroups([],{
                       limit: Stem.config.map.poiLimit,
                       parentId: Stem.config.oae.groups.organizations
                    })
                );
            }

            if (!this.get('businesses')) {
                this.set('businesses',
                    new Stem.Collections.SubGroups([], {
                       limit: Stem.config.map.poiLimit,
                        parentId: Stem.config.oae.groups.businesses
                    })
                );
            }

            if (!this.get('schools')) {
                this.set('schools',
                    new Stem.Collections.SubGroups([],{
                       limit: Stem.config.map.poiLimit,
                       parentId: Stem.config.oae.groups.schools
                    })
                );
            }

            // To keep things readable, use local variables
            // as a convenient reference to these attributes.

            var organizations = this.get('organizations');
            var businesses = this.get('businesses');
            var schools = this.get('schools');

            // Before we fetch the data from the OAE,
            // set up handlers to deal with additions to
            // each collection.

            organizations.on('add', this.organizationAdded, this);
            businesses.on('add', this.businessAdded, this);
            schools.on('add', this.schoolAdded, this);

            // If the collections were supplied on model
            // creation, they already have members, so
            // simply add them. If the collections are
            // empty, then we fetch them from the OAE.

            if (organizations.length > 0) {
                organizations.each(_(this.organizationAdded).bind(this));
            } else {
                organizations.fetch({validate: true});
            }

            if (businesses.length > 0) {
                businesses.each(_(this.businessAdded).bind(this));
            } else {
                businesses.fetch({validate: true});
            }

            if (schools.length > 0) {
                schools.each(_(this.schoolAdded).bind(this));
            } else {
                schools.fetch({validate: true});
            }

        },

        setupProposals: function () {

            // Create a new collection that tracks
            // proposals as points of interest (e.g.
            // on a map). We allow this collection to
            // be provided during model creation for
            // ease of testing and future flexibility/

            if (!this.get('proposalPois')) {
                this.set('proposalPois',
                    new Stem.Collections.Pois()
                );
            }

            // A separate collection holds the proposals
            // that have points of interest.

            if (!this.get('proposals')) {
                this.set('proposals',
                    new Stem.Collections.Proposals([],{
                        maxSize: 50
                    })
                );
            }

            var proposals = this.get('proposals');

            // For each DonorsChoose proposal, add a corresponding
            // model to our points of interest collection. Since
            // these proposals will be incrementally added to the
            // collection once we trigger the fetch, we hook the
            // `add` event.

            proposals.on('add', this.proposalAdded, this);

            // Finally, handle the case in which proposals
            // were provided during model creation. In
            // that case, we don't need to fetch them
            // from the service but can simply add them
            // now.

            if (proposals.length > 0) {
                proposals.each(_(this.proposalAdded).bind(this));
            } else {
                proposals.fetch();
            }

        },

        setupPartnerships: function () {

            // Spotlights are featured case studies
            // of successful partnerships that we
            // access as sub-groups on the OAE.
            // All we need to do for set up is
            // define the collection and initiate
            // a fetch. As with other collections,
            // we permit the collection to be
            // specified when the model is
            // created.

            if (!this.get('partnerships')) {
                this.set('partnerships',
                    new Stem.Collections.SubGroups([], {
                        limit: 10,
                        parentId: Stem.config.oae.groups.partnerships
                    })
                );
            }

            var partnerships = this.get('partnerships');

            // If the collection is empty (i.e.
            // not supplied in the model's
            // creation), fetch it from the OAE.

            if (partnerships.length === 0) {
                partnerships.fetch({validate: true});
            }

        },

        // Get the latitude and longitude
        // for an OAE group,

        getLatLong: function (group, className) {

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
                    
                    this.get('organizationPois').add(
                        new Stem.Models.Poi({
                            className: className,
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

                            this.get('organizationPois').add(
                                new Stem.Models.Poi({
                                    className: className,
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

        organizationAdded: function (business) {

            // Try to extract geolocation from the
            // group.

            this.getLatLong(business, 'theme-3-dark poi-organization');

        },

        businessAdded: function (business) {

            // Try to extract geolocation from the
            // group.

            this.getLatLong(business, 'theme-3 poi-business');

        },

        schoolAdded: function (school) {

            // Try to extract geolocation from the
            // group.

            this.getLatLong(school, 'theme-3-light poi-school');

        },

        // Function called when a new DonorsChoose proposal
        // has been fetched from DonorsChoose and added to
        // our internal collection.

        proposalAdded: function (proposal) {

            // Extract the relevant information from the
            // DonorsChoose response for our own POI model
            // and add it to our internal collection.

            this.get('proposalPois').add(
                new Stem.Models.Poi({
                    className: 'theme-0-black poi-proposal',
                    imageUrl:  proposal.get('thumbImageURL'),
                    latitude:  proposal.get('latitude'),
                    link:      proposal.get('proposalURL'),
                    longitude: proposal.get('longitude'),
                    title:     proposal.get('title')
                })
            );

        },

        // Model iniitalization.

        initialize: function () {

            // Set up the individual parts of the model.

            this.setupOrganizations();
            this.setupProposals();
            this.setupPartnerships();

        }

    });

})();
