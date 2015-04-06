/* jshint sub: true */
/*global before, describe, it, sinon, $, Stem  */

describe('Partners Model', function () {

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
            "resourceType": "user",
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

    var donorsChooseResponse = {
      'searchTerms': 'GA',
      'searchURL': 'http://www.donorschoose.org/donors/search.html?subject4=-4&state=GA&utm_source=api&utm_medium=feed&utm_content=searchlink&utm_campaign=DONORSCHOOSE',
      'totalProposals': '923',
      'index': '0',
      'max': '2',
      'breadcrumb': [
        [
          'state',
          'GA',
          'Georgia'
        ],
        [
          'max',
          '2',
          ''
        ]
      ],
      'proposals': [
        {
          'id': '1485698',
          'proposalURL': 'http://www.donorschoose.org/project/literacy-with-lightning-thief/1485698/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE',
          'fundURL': 'https://secure.donorschoose.org/donors/givingCart.html?proposalid=1485698&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE',
          'imageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2362300_sm.jpg?timestamp=1422930488149',
          'thumbImageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2362300_thmb.jpg?timestamp=1422930488149',
          'title': 'Literacy with Lightning Thief!',
          'shortDescription': 'A typical day in my classroom includes challenging content, cooperative learning experiences, critical thinking, authentic learning, and literature that students enjoy. My students come from...',
          'fulfillmentTrailer': 'My students need 80 copies of our book study, The Lightning Thief, to improve literacy skills and integrate with teaching of social studies and science content.',
          'snippets': [

          ],
          'percentFunded': '82',
          'numDonors': '9',
          'costToComplete': '115.09',
          'matchingFund': {
            'matchingKey': '',
            'ownerRegion': '',
            'name': '',
            'type': '',
            'logoURL': '',
            'faqURL': '',
            'amount': '0.00',
            'description': ''
          },
          'teacherFFPromoCodeFund': {
            'eligible': 'true',
            'deadline': 'February 9',
            'code': 'SPARK',
            'matchingKey': 'teacherProm6',
            'ownerRegion': 'Marketing',
            'name': 'Matching Donor',
            'type': 'PROMO',
            'logoURL': '',
            'description': ''
          },
          'totalPrice': '630.09',
          'freeShipping': 'true',
          'teacherId': '2362300',
          'teacherName': 'Ms. Hudak',
          'gradeLevel': {
            'id': '2',
            'name': 'Grades 3-5'
          },
          'povertyLevel': 'High Poverty',
          'teacherTypes': [

          ],
          'schoolTypes': [
            {
              'id': 1,
              'name': 'Charter'
            },
            {
              'id': 12,
              'name': 'Horace Mann (partner)'
            },
            {
              'id': 3,
              'name': 'Special Education'
            }
          ],
          'schoolName': 'A L Burruss Elementary School',
          'schoolUrl': 'http://www.donorschoose.org/school/a-l-burruss-elementary-school/53726/',
          'city': 'Marietta',
          'zip': '30064-3017',
          'state': 'GA',
          'stateFullName': 'Georgia',
          'latitude': '33.944608000000000',
          'longitude': '-84.577635000000000',
          'zone': {
            'id': '313',
            'name': 'Georgia'
          },
          'subject': {
            'id': '3',
            'name': 'Literature &amp; Writing',
            'groupId': '6'
          },
          'additionalSubjects': [
            {
              'id': '15',
              'name': 'Social Sciences',
              'groupId': '3'
            }
          ],
          'resource': {
            'id': '1',
            'name': 'Books'
          },
          'expirationDate': '2015-05-31',
          'fundingStatus': 'needs funding'
        }
      ]
    };

    before(function () {
        var ajaxStub = sinon.stub($, 'ajax');
        ajaxStub.onCall(0).yieldsTo('success', oaeResponse);
        ajaxStub.onCall(1).yieldsTo('success', oaeResponse);
        ajaxStub.onCall(2).yieldsTo('success', donorsChooseResponse);
        ajaxStub.onCall(3).yieldsTo('success', oaeResponse);
        var locationStub = sinon.stub(Stem.Utils, 'getLocationFromStreet');
        locationStub.callsArgWith(1, [1,2]);
        this.PartnersModel = new Stem.Models.Partners();
        ajaxStub.restore();
        locationStub.restore();
    });


    it('should load partners and groups into points of interest', function () {
        this.PartnersModel.get('organizationPois').length.should.equal(2);
    });

    it('should load proposals into points of interest', function () {
        this.PartnersModel.get('proposalPois').length.should.equal(1);
    });

    it('should load partnerships', function () {
        this.PartnersModel.get('partnerships').length.should.equal(1);
    });

    it('should not load new collections when given existing ones', function () {
        var ajaxSpy = sinon.spy($, 'ajax');
        var locationStub = sinon.stub(Stem.Utils, 'getLocationFromStreet');
        locationStub.callsArgWith(1, [1,2]);
        var partners = new Stem.Models.Partners({
            businesses: new Stem.Collections.SubGroups([{}]),
            partnerships: new Stem.Collections.SubGroups([{}]),
            proposals: new Stem.Collections.Proposals([{}]),
            schools: new Stem.Collections.SubGroups([{}])
        });
        ajaxSpy.called.should.be.false();
        locationStub.restore();
        ajaxSpy.restore();
    });

});
