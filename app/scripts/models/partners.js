/*global Stem, Backbone*/

// The partners model encapsulates information
// about partnerships between schools and
// businessses.

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Partners = Backbone.Model.extend({

        // Define the default properties of a model.
        // Those include the geographic coordinates
        // that define a nexus for schools and
        // businesses to meet.

        defaults: {
            latitude:     Stem.config.geo.latitude,
            longitude:    Stem.config.geo.longitude
        },

        // Handle initialization for DonorsChoose proposals
        // that might be relevant for the partners.

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

            this.setupProposals();

        }

    });

})();
