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

            this.organizationPois = new Stem.Collections.Pois();

            var businesses = new Stem.Collections.SubGroups([], {
                limit: 99,
                parentId: Stem.config.oae.groups.businesses
            });
            var schools = new Stem.Collections.SubGroups([],{
                limit: 99,
                parentId: Stem.config.oae.groups.schools
            });

            // Before we fetch the data from the OAE,
            // set up handlers to deal with additions to
            // each collection.

            businesses.on('add', this.businessAdded, this);
            schools.on('add', this.schoolsAdded, this);

            // Now we can kick off the fetch from OAE.

            businesses.fetch({validate: true});
            schools.fetch({validate: true});

            // Build the tag set that controls display of
            // organizations.

            this.showBusinesses = new Stem.Models.Tag({
                label: 'Organizations',
                selected: true
            });
            this.showSchools = new Stem.Models.Tag({
                label: 'Schools',
                selected: true
            });

            // Create a single collection of all tags to
            // conveniently capture change events.

            this.tags = new Stem.Collections.Tags([
                this.showSchools,
                this.showBusinesses
            ]);

            this.listenTo(this.tags, 'change', this.updateFilters);

            // Gather the tags into a tag set.

            this.tagSet = new Stem.Models.TagSet({
                tags:  this.tags,
                title: 'I’m looking for'
            });

        },

        setupProposals: function () {

            // Create a new collection that tracks
            // proposals as points of interest (e.g.
            // on a map).

            this.proposalPois = new Stem.Collections.Pois();

            // Populate the proposal points of interest with
            // data from general DonorsChoose proposals.

            var proposals = new Stem.Collections.Proposals([],{
               maxSize: 50
            });

            // For each DonorsChoose proposal, add a corresponding
            // model to our points of interest collection. Since
            // these proposals will be incrementally added to the
            // collection once we trigger the fetch, we hook the
            // `add` event.

            proposals.on('add', this.proposalAdded, this);

            // Fetch the proposals from DonorsChoose.

            proposals.fetch();

        },

        // Get the latitude and longitude
        // for an OAE group,

        getLatLong: function (group, className) {

            // Look for a street address in the
            // group's description. That would be
            // a line that begins "Address:".

            var addrLines = _(group.description.split('\n'))
                .filter(function(line) {
                    return line.trim()
                        .toLowerCase()
                        .indexOf('address:') === 0;
                });

            // If we found an address in the
            // description, we're in business.

            if (addrLines.length) {

                // Use a network service to retrieve
                // geographic coordinates from a
                // street address.

                Stem.Utils.getLocationFromStreet(
                    addrLines[0].substr(8).trim(),
                    _.bind(function (latLong) {

                        this.organizationPois.add(
                            new Stem.Models.Poi({
                                className: className,
                                imageUrl:  group.get('thumbnailUrl'),
                                latitude:  latLong[0],
                                link:      Stem.config.oae.protocol +
                                           '//' + Stem.config.oae.host +
                                           group.get('profilePath'),
                                longitude: latLong[1],
                                title:     group.get('displayName')
                            })
                        );

                    }, this)

                );

            }

        },

        businessAdded: function (business) {

            // Try to extract geolocation from the
            // group.

            var latLong = this.getLatLong(business, 'poi-business');

        },

        schoolAdded: function (school) {

            // Try to extract geolocation from the
            // group.

            var latLong = this.getLatLong(school, 'poi-school');

        },

        // Function called when a new DonorsChoose proposal
        // has been fetched from DonorsChoose and added to
        // our internal collection.

        proposalAdded: function (proposal) {

            // Extract the relevant information from the
            // DonorsChoose response for our own POI model
            // and add it to our internal collection.

            this.proposalPois.add(
                new Stem.Models.Poi({
                    className: 'poi-proposal',
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

        }

    });

})();
