/*global beforeEach, describe, it, sinon, $, Stem  */

describe('Groups Collection', function () {
    'use strict';

    // The following is the actual response of OAE to the GET request
    // `https://stemincubator.oaeproject.org/api/search/general?limit=20&q=&resourceTypes=group&scope=_tenant`
    // as captured on 2015-02-06

    var oaeResponse = {
        total: 1,
        results: [
        {
            id: "g:si:W1wSHmi2X",
            joinable: "yes",
            visibility: "public",
            tenantAlias: "si",
            thumbnailUrl: "/api/download/signed?uri=local%3Ag%2Fsi%2FW1%2FwS%2FHm%2Fi2%2FW1wSHmi2X%2Fprofilepictures%2F1411567822900%2Fmedium.jpg&expires=1424304000000&signature=4efe63666b2a24821d4d4840f96c765890d7e49a",
            displayName: "Science Learning Integrating Design, Engineering and Robotics (SLIDER)",
            resourceType: "group",
            profilePath: "/group/si/W1wSHmi2X",
            tenant: {
                alias: "si",
                displayName: "Georgia STEM incubator"
            }
        }
        ]
    };

    beforeEach(function () {
        this.GroupsCollection = new Stem.Collections.Groups();
    });

    it('should have the correct URL for OAE', function() {
        this.GroupsCollection.url.should.equal('https://stemincubator.oae-qa1.oaeproject.org/api/search/general?limit=20&q=&resourceTypes=group&scope=_tenant');
    });

    it('should parse the response from OAE', function() {
        this.ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', oaeResponse);
        this.GroupsCollection.fetch();
        this.GroupsCollection.length.should.equal(1);
        this.ajaxStub.restore();
    });

    it('should create models from the OAE response', function() {
        this.ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', oaeResponse);
        this.GroupsCollection.fetch();
        this.GroupsCollection.at(0).get('displayName').should.equal(oaeResponse.results[0].displayName);
        this.ajaxStub.restore();
    });
});
