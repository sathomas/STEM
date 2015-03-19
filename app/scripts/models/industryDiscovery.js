/*global Stem, Backbone*/

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.IndustryDiscovery = Backbone.Model.extend({

        // Define the default properties of a model.

        defaults: {
            latitude:     Stem.config.geo.latitude,
            longitude:    Stem.config.geo.longitude
        },

        // Handle initialization for DonorsChoose proposals.

        setupProposals: function () {

            this.proposalPois = new Stem.Collections.Pois();

            // Populate the proposal points of interest with
            // data from DonorsChoose proposals.

            var proposals = new Stem.Collections.Proposals([],{
               maxSize: 50
            });

            // For each DonorsChoose proposal, add a corresponding
            // model to our points of interest collection.

            proposals.on('add', this.proposalAdded, this);

            // Fetch the proposals.

            proposals.fetch();

        },

        proposalAdded: function (proposal) {

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

        initialize: function () {

            this.setupProposals();

        }

    });

})();
