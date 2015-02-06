/*global beforeEach, describe, it, _  */
'use strict';

describe("Proposal Model", function () {

    // The following is the actual response of DonorsChoose to the GET request
    // `http://api.donorschoose.org/common/json_feed.html?APIKey=DONORSCHOOSE&id=1390243`
    // as captured on 2015-02-04.

    var donorsChooseResponse = {
      "searchTerms": "Project 1390243",
      "searchURL": "http://www.donorschoose.org/donors/search.html?id=1390243&utm_source=api&utm_medium=feed&utm_content=searchlink&utm_campaign=DONORSCHOOSE",
      "totalProposals": "1",
      "index": "0",
      "max": "1",
      "proposals": [
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

    beforeEach(function() {
        this.ProposalModel = new Stem.Models.Proposal();
    })

    it('should generate the correct URL to access DonorsChoose', function() {
        this.ProposalModel.set('id', '12345');
        this.ProposalModel.url().should.equal('http://api.donorschoose.org/common/json_feed.html?APIKey=DONORSCHOOSE&id=12345');
    })

    it('should parse the response from DonorsChoose', function() {
        this.ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', donorsChooseResponse);
        this.ProposalModel.set('id', donorsChooseResponse.proposals[0].id);
        this.ProposalModel.fetch();
        this.ProposalModel.get('title').should.equal(donorsChooseResponse.proposals[0].title);
        this.ajaxStub.restore();
    })

    it('should not parse directly supplied attributes', function() {
        var proposalModel = new Stem.Models.Proposal(donorsChooseResponse.proposals[0]);
        proposalModel.get('title').should.equal(donorsChooseResponse.proposals[0].title);
    })

    it('should validate the required properties of the model', function() {
        this.ProposalModel.isValid().should.be.false;
        this.ProposalModel.set('title', '').isValid().should.be.false;
        this.ProposalModel.set('imageURL', '').isValid().should.be.false;
        this.ProposalModel.set('shortDescription', '').isValid().should.be.false;
        this.ProposalModel.set('schoolName', '').isValid().should.be.false;
        this.ProposalModel.set('city', '').isValid().should.be.false;
        this.ProposalModel.set('fulfillmentTrailer', '').isValid().should.be.false;
        this.ProposalModel.set('proposalURL', '').isValid().should.be.false;
        this.ProposalModel.set('povertyLevel', '').isValid().should.be.false;
        this.ProposalModel.set('totalPrice', '').isValid().should.be.false;
        this.ProposalModel.set('costToComplete', '').isValid().should.be.true;
    })

    it('should throw an error if model write is requested', function() {
        this.ProposalModel.set({
            'title': '',
            'imageURL': '',
            'shortDescription': '',
            'schoolName': '',
            'city': '',
            'fulfillmentTrailer': '',
            'proposalURL': '',
            'povertyLevel': '',
            'totalPrice': '',
            'costToComplete': ''
        });
        _(this.ProposalModel.save).bind(this.ProposalModel).should.throw(/read-only/);
    })

});
