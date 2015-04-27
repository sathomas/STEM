/* jshint sub: true */
/*global beforeEach, afterEach, describe, it, sinon, $, Stem  */

describe('Admins Model', function () {

    'use strict';

    var oaeResponse = { "results": [
        {
          "profile": {
            "id": "g:gatech:XkcBsFRK",
            "description": "Address: 266 Fourth St. NW  Atlanta, GA 30332",
            "resourceType": "group",
            "picture": {
              "small": "/api/download/signed?uri=local%3Au%2Fgatech%2Flk%2Fnv%2FFk%2FQk%2FlknvFkQkb%2Fprofilepictures%2F1406724198397%2Fsmall.jpg&expires=1427932800000&signature=225e10bfa0c33c02a22d18b31626807d5726dfb1",
              "large": "/api/download/signed?uri=local%3Au%2Fgatech%2Flk%2Fnv%2FFk%2FQk%2FlknvFkQkb%2Fprofilepictures%2F1406724190852%2Flarge.jpg&expires=1427932800000&signature=58fbe47d36cc415006d748c54458607d012bdc1d",
              "medium": "/api/download/signed?uri=local%3Au%2Fgatech%2Flk%2Fnv%2FFk%2FQk%2FlknvFkQkb%2Fprofilepictures%2F1406724198397%2Fmedium.jpg&expires=1427932800000&signature=202cf2b1b8c5d3d8e8eabc7a6293162a17c4517b"
            },
            "profilePath": "/group/gatech/XkcBsFRK",
            "joinable": "no",
            "tenant": {
              "alias": "gatech",
              "displayName": "Georgia Institute of Technology"
            },
            "lastModified": "1426871171399",
            "createdBy": "u:gatech:lknvFkQkb",
            "visibility": "public",
            "created": "2015-03-20T17:04:16.564Z",
            "displayName": "Child Group"
          },
          "role": "member"
        },
        {
          "profile": {
            "id": "u:gatech:lknvFkQkb",
            "description": "LatLong: [1,2]",
            "resourceType": "group",
            "picture": {
              "small": "/api/download/signed?uri=local%3Au%2Fgatech%2Flk%2Fnv%2FFk%2FQk%2FlknvFkQkb%2Fprofilepictures%2F1406724198397%2Fsmall.jpg&expires=1427932800000&signature=225e10bfa0c33c02a22d18b31626807d5726dfb1",
              "large": "/api/download/signed?uri=local%3Au%2Fgatech%2Flk%2Fnv%2FFk%2FQk%2FlknvFkQkb%2Fprofilepictures%2F1406724190852%2Flarge.jpg&expires=1427932800000&signature=58fbe47d36cc415006d748c54458607d012bdc1d",
              "medium": "/api/download/signed?uri=local%3Au%2Fgatech%2Flk%2Fnv%2FFk%2FQk%2FlknvFkQkb%2Fprofilepictures%2F1406724198397%2Fmedium.jpg&expires=1427932800000&signature=202cf2b1b8c5d3d8e8eabc7a6293162a17c4517b"
            },
            "profilePath": "/user/gatech/lknvFkQkb",
            "notificationsUnread": 0,
            "locale": "en_US",
            "publicAlias": "Stephen Anthony Thomas",
            "tenant": {
              "alias": "gatech",
              "displayName": "Georgia Institute of Technology"
            },
            "notificationsLastRead": 1426796595298,
            "acceptedTC": 0,
            "visibility": "public",
            "lastModified": 1426796595300,
            "email": "stephen.thomas@et.gatech.edu",
            "displayName": "Stephen Thomas",
            "emailPreference": "daily"
          },
          "role": "manager"
        }],
        "nextToken": null
    };

    beforeEach(function () {
        this.ajaxStub = sinon.stub($, 'ajax');
        this.ajaxStub.yieldsTo('success', oaeResponse);
        this.locationStub = sinon.stub(Stem.Utils, 'getLocationFromStreet');
        this.locationStub.callsArgWith(1, [1,2]);
        this.AdminsModel = new Stem.Models.Admins();
    });
    
    afterEach(function () {
        this.ajaxStub.restore();
        this.locationStub.restore();
    });

    it('should load certified schools into points of interest', function () {
        this.AdminsModel.get('certificationPois').length.should.equal(2);
    });

    it('should load spotlights', function () {
        this.AdminsModel.get('spotlights').length.should.equal(2);
    });

    it('should not load a new collection when given existing one', function () {
        var intialCalls = this.ajaxStub.callCount;
        new Stem.Models.Admins({
            certifications: new Stem.Collections.SubGroups([{}]),
            spotlights: new Stem.Collections.SubGroups([{}])
        });
        this.ajaxStub.callCount.should.equal(intialCalls);
    });

    it('should lookup street address when no lat/long is available', function () {
        this.locationStub.callCount.should.equal(1);
    });

});
