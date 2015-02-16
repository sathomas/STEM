/* jshint sub: true */
/* global Stem, beforeEach, describe, it, sinon */

describe('Proposals Collection', function () {

    'use strict';

    // The following is the actual response of DonorsChoose to the GET request
    // `http://api.donorschoose.org/common/json_feed.html?APIKey=DONORSCHOOSE&state=GA&subject4=-4&max=2`
    // as captured on 2015-02-04.

    var donorsChooseResponse = {
      "searchTerms": "GA",
      "searchURL": "http://www.donorschoose.org/donors/search.html?'subject4=-4&state=GA&utm_source=api&utm_medium=feed&utm_content=searchlink&utm_campaign=DONORSCHOOSE",
      "totalProposals": "923",
      "index": "0",
      "max": "2",
      "breadcrumb": [
        [
          "state",
          "GA",
          "Georgia"
        ],
        [
          "max",
          "2",
          ""
        ]
      ],
      "proposals": [
        {
          "id": "1485698",
          "proposalURL": "http://www.donorschoose.org/project/literacy-with-lightning-thief/1485698/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE",
          "fundURL": "https://secure.donorschoose.org/donors/givingCart.html?proposalid=1485698&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE",
          "imageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2362300_sm.jpg?timestamp=1422930488149",
          "thumbImageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2362300_thmb.jpg?timestamp=1422930488149",
          "title": "Literacy with Lightning Thief!",
          "shortDescription": "A typical day in my classroom includes challenging content, cooperative learning experiences, critical thinking, authentic learning, and literature that students enjoy. My students come from...",
          "fulfillmentTrailer": "My students need 80 copies of our book study, The Lightning Thief, to improve literacy skills and integrate with teaching of social studies and science content.",
          "snippets": [

          ],
          "percentFunded": "82",
          "numDonors": "9",
          "costToComplete": "115.09",
          "matchingFund": {
            "matchingKey": "",
            "ownerRegion": "",
            "name": "",
            "type": "",
            "logoURL": "",
            "faqURL": "",
            "amount": "0.00",
            "description": ""
          },
          "teacherFFPromoCodeFund": {
            "eligible": "true",
            "deadline": "February 9",
            "code": "SPARK",
            "matchingKey": "teacherProm6",
            "ownerRegion": "Marketing",
            "name": "Matching Donor",
            "type": "PROMO",
            "logoURL": "",
            "description": ""
          },
          "totalPrice": "630.09",
          "freeShipping": "true",
          "teacherId": "2362300",
          "teacherName": "Ms. Hudak",
          "gradeLevel": {
            "id": "2",
            "name": "Grades 3-5"
          },
          "povertyLevel": "High Poverty",
          "teacherTypes": [

          ],
          "schoolTypes": [
            {
              "id": 1,
              "name": "Charter"
            },
            {
              "id": 12,
              "name": "Horace Mann (partner)"
            },
            {
              "id": 3,
              "name": "Special Education"
            }
          ],
          "schoolName": "A L Burruss Elementary School",
          "schoolUrl": "http://www.donorschoose.org/school/a-l-burruss-elementary-school/53726/",
          "city": "Marietta",
          "zip": "30064-3017",
          "state": "GA",
          "stateFullName": "Georgia",
          "latitude": "33.944608000000000",
          "longitude": "-84.577635000000000",
          "zone": {
            "id": "313",
            "name": "Georgia"
          },
          "subject": {
            "id": "3",
            "name": "Literature &amp; Writing",
            "groupId": "6"
          },
          "additionalSubjects": [
            {
              "id": "15",
              "name": "Social Sciences",
              "groupId": "3"
            }
          ],
          "resource": {
            "id": "1",
            "name": "Books"
          },
          "expirationDate": "2015-05-31",
          "fundingStatus": "needs funding"
        },
        {
          "id": "1390243",
          "proposalURL": "http://www.donorschoose.org/project/whos-afraid-of-math-not-us/1390243/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE",
          "fundURL": "https://secure.donorschoose.org/donors/givingCart.html?proposalid=1390243&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE",
          "imageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2593620_sm.jpg?timestamp=1412867950204",
          "thumbImageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2593620_thmb.jpg?timestamp=1412867950204",
          "title": "Who&#039;s Afraid Of Math? Not Us!",
          "shortDescription": "\"I'm not good at math.\"<br />We've all heard it. Countless times. From children and adults alike. They are afraid of math. But, why be afraid? It's only numbers. They can't hurt you! In my class, we...",
          "fulfillmentTrailer": "My students need five tablets (and cases) to practice math facts and other skills though various apps.",
          "snippets": [

          ],
          "percentFunded": "61",
          "numDonors": "7",
          "costToComplete": "216.66",
          "matchingFund": {
            "matchingKey": "",
            "ownerRegion": "",
            "name": "",
            "type": "",
            "logoURL": "",
            "faqURL": "",
            "amount": "0.00",
            "description": ""
          },
          "totalPrice": "551.66",
          "freeShipping": "true",
          "teacherId": "2593620",
          "teacherName": "Ms. DeBay",
          "gradeLevel": {
            "id": "2",
            "name": "Grades 3-5"
          },
          "povertyLevel": "Highest Poverty",
          "teacherTypes": [

          ],
          "schoolTypes": [
            {
              "id": 12,
              "name": "Horace Mann (partner)"
            },
            {
              "id": 3,
              "name": "Special Education"
            },
            {
              "id": 14,
              "name": "Kia (partner)"
            }
          ],
          "schoolName": "R L Norton Elementary School",
          "schoolUrl": "http://www.donorschoose.org/school/r-l-norton-elementary-school/53187/",
          "city": "Snellville",
          "zip": "30039-5232",
          "state": "GA",
          "stateFullName": "Georgia",
          "latitude": "33.807476127271322",
          "longitude": "-84.030656226507972",
          "zone": {
            "id": "313",
            "name": "Georgia"
          },
          "subject": {
            "id": "8",
            "name": "Mathematics",
            "groupId": "4"
          },
          "resource": {
            "id": "2",
            "name": "Technology"
          },
          "expirationDate": "2015-02-09",
          "fundingStatus": "needs funding"
        }
      ]
    };

    // Convenience function to parse URLs by taking
    // advantage of the browser.

    var parseURL = function(url) {

        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substr(1);
        var queries = {};
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            queries[item[0]] = decodeURIComponent(item[1]);
        });

        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            queries: queries,
            hash: parser.hash
        };
    }

    beforeEach(function () {
        this.ProposalsCollection = new Stem.Collections.Proposals();
    });

    it('should generate the correct default URL to access DonorsChoose', function() {
        parseURL(this.ProposalsCollection.url())['protocol'].should.equal('http:');
        parseURL(this.ProposalsCollection.url())['host'].should.equal('api.donorschoose.org');
        parseURL(this.ProposalsCollection.url())['pathname'].should.equal('/common/json_feed.html');
        parseURL(this.ProposalsCollection.url()).queries['APIKey'].should.equal('DONORSCHOOSE');
        parseURL(this.ProposalsCollection.url()).queries['state'].should.equal('GA');
        parseURL(this.ProposalsCollection.url()).queries['subject4'].should.equal('-4');
    });

    it('should generate the correct URL for specific subjects', function() {
        parseURL((new Stem.Collections.Proposals([], {subject: 'Health & Life Science'})).url()).queries['subject4'].should.equal('4');
        parseURL((new Stem.Collections.Proposals([], {subject: 'Applied Science'})).url()).queries['subject4'].should.equal('6');
        parseURL((new Stem.Collections.Proposals([], {subject: 'Environmental Science'})).url()).queries['subject4'].should.equal('7');
        parseURL((new Stem.Collections.Proposals([], {subject: 'Mathematics'})).url()).queries['subject4'].should.equal('8');
    });

    it('should generate the correct URL for specific grade levels', function() {
        parseURL((new Stem.Collections.Proposals([], {grade: 'primary'})).url()).queries['gradeType'].should.equal('1');
        parseURL((new Stem.Collections.Proposals([], {grade: 'elementary'})).url()).queries['gradeType'].should.equal('2');
        parseURL((new Stem.Collections.Proposals([], {grade: 'middle'})).url()).queries['gradeType'].should.equal('3');
        parseURL((new Stem.Collections.Proposals([], {grade: 'high'})).url()).queries['gradeType'].should.equal('4');
        parseURL((new Stem.Collections.Proposals([], {grade: 'adult'})).url()).queries['gradeType'].should.equal('5');
    });

    it('should include specified keywords in the request URL', function() {
        parseURL((new Stem.Collections.Proposals([], {keywords: 'one two'})).url()).queries['keywords'].should.equal('"one two"');
    });

    it('should ask for historical data in the request URL', function() {
        parseURL((new Stem.Collections.Proposals([], {historical: true})).url()).queries['historical'].should.equal('true');
    });

    it('should include specified size limit in the request URL', function() {
        parseURL((new Stem.Collections.Proposals([], {maxSize: 5})).url()).queries['max'].should.equal('5');
    });

    it('should include specified sort option in the request URL', function() {
        parseURL((new Stem.Collections.Proposals([], {sortBy: 'urgency'})).url()).queries['sortBy'].should.equal('0');
        parseURL((new Stem.Collections.Proposals([], {sortBy: 'poverty'})).url()).queries['sortBy'].should.equal('1');
        parseURL((new Stem.Collections.Proposals([], {sortBy: 'cost'})).url()).queries['sortBy'].should.equal('2');
        parseURL((new Stem.Collections.Proposals([], {sortBy: 'popularity'})).url()).queries['sortBy'].should.equal('4');
        parseURL((new Stem.Collections.Proposals([], {sortBy: 'expiration'})).url()).queries['sortBy'].should.equal('5');
        parseURL((new Stem.Collections.Proposals([], {sortBy: 'newest'})).url()).queries['sortBy'].should.equal('7');
    });

    it('should parse the response from DonorsChoose', function() {
        this.ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', donorsChooseResponse);
        this.ProposalsCollection.fetch();
        this.ProposalsCollection.length.should.equal(2);
        this.ajaxStub.restore();
    });

    it('should create models from the DonorsChoose response', function() {
        this.ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', donorsChooseResponse);
        this.ProposalsCollection.fetch();
        this.ProposalsCollection.at(0).get('title').should.equal(donorsChooseResponse.proposals[0].title);
        this.ProposalsCollection.at(1).get('title').should.equal(donorsChooseResponse.proposals[1].title);
        this.ajaxStub.restore();
    });

    it('should throw an error if collection write is requested', function() {
        this.ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', donorsChooseResponse);
        this.ProposalsCollection.fetch();
        _(this.ProposalsCollection.sync).bind(this.ProposalsCollection).should.throw(/read-only/);
        this.ajaxStub.restore();
    });

});
