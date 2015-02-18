/*global beforeEach, describe, it, sinon, $, Stem */

describe('ProposalsAsHighlights View', function () {
    'use strict';

    // The following is the actual response of DonorsChoose to the GET request
    // `http://api.donorschoose.org/common/json_feed.html?APIKey=DONORSCHOOSE&state=GA&subject4=-4&max=4`
    // as captured on 2015-02-05.

    var donorsChooseResponse = {
      'searchTerms': 'Math &amp; Science &gt; GA',
      'searchURL': 'http://www.donorschoose.org/donors/search.html?state=GA&subject4=-4&utm_source=api&utm_medium=feed&utm_content=searchlink&utm_campaign=DONORSCHOOSE',
      'totalProposals': '477',
      'index': '0',
      'max': '4',
      'breadcrumb': [
        [
          'state',
          'GA',
          'Georgia'
        ],
        [
          'subject4',
          '-4',
          'Math &amp; Science'
        ],
        [
          'max',
          '4',
          ''
        ]
      ],
      'proposals': [
        {
          'id': '1448638',
          'proposalURL': 'http://www.donorschoose.org/project/science-ambassadors-family-science-and/1448638/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE',
          'fundURL': 'https://secure.donorschoose.org/donors/givingCart.html?proposalid=1448638&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE',
          'imageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2399508_sm.jpg?timestamp=1418569911470',
          'thumbImageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2399508_thmb.jpg?timestamp=1418569911470',
          'title': 'Science Ambassadors (Family Science and Engineering Nights)',
          'shortDescription': 'I hear I forget, I see I remember, I do and I understand. This is the heart of our program. The schools that our Science Ambassadors will serve are located in a rural area of our county. Many of...',
          'fulfillmentTrailer': 'My students need a variety of hand-on materials for our Family Science and Engineering Nights, including battery holders, mini lamps, buzzers and safety glasses to learn how electricity works at the electrified station.',
          'snippets': [

          ],
          'percentFunded': '94',
          'numDonors': '8',
          'costToComplete': '24.52',
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
          'totalPrice': '392.45',
          'freeShipping': 'false',
          'teacherId': '2399508',
          'teacherName': 'Mrs. Webb',
          'gradeLevel': {
            'id': '2',
            'name': 'Grades 3-5'
          },
          'povertyLevel': '',
          'teacherTypes': [

          ],
          'schoolTypes': [
            {
              'id': 12,
              'name': 'Horace Mann (partner)'
            },
            {
              'id': 3,
              'name': 'Special Education'
            }
          ],
          'schoolName': 'Coal Mountain Elementary School',
          'schoolUrl': 'http://www.donorschoose.org/school/coal-mountain-elementary-school/49677/',
          'city': 'Cumming',
          'zip': '30028-3277',
          'state': 'GA',
          'stateFullName': 'Georgia',
          'latitude': '34.274839000000000',
          'longitude': '-84.104850000000000',
          'zone': {
            'id': '313',
            'name': 'Georgia'
          },
          'subject': {
            'id': '6',
            'name': 'Applied Sciences',
            'groupId': '4'
          },
          'additionalSubjects': [
            {
              'id': '19',
              'name': 'Other',
              'groupId': '5'
            }
          ],
          'resource': {
            'id': '3',
            'name': 'Supplies'
          },
          'expirationDate': '2015-05-01',
          'fundingStatus': 'needs funding'
        },
        {
          'id': '1390243',
          'proposalURL': 'http://www.donorschoose.org/project/whos-afraid-of-math-not-us/1390243/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE',
          'fundURL': 'https://secure.donorschoose.org/donors/givingCart.html?proposalid=1390243&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE',
          'imageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2593620_sm.jpg?timestamp=1412867950204',
          'thumbImageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2593620_thmb.jpg?timestamp=1412867950204',
          'title': 'Who&#039;s Afraid Of Math? Not Us!',
          'shortDescription': '\'I\'m not good at math.\'<br />We\'ve all heard it. Countless times. From children and adults alike. They are afraid of math. But, why be afraid? It\'s only numbers. They can\'t hurt you! In my class, we...',
          'fulfillmentTrailer': 'My students need five tablets (and cases) to practice math facts and other skills though various apps.',
          'snippets': [

          ],
          'percentFunded': '61',
          'numDonors': '7',
          'costToComplete': '216.66',
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
          'totalPrice': '551.66',
          'freeShipping': 'true',
          'teacherId': '2593620',
          'teacherName': 'Ms. DeBay',
          'gradeLevel': {
            'id': '2',
            'name': 'Grades 3-5'
          },
          'povertyLevel': 'Highest Poverty',
          'teacherTypes': [

          ],
          'schoolTypes': [
            {
              'id': 12,
              'name': 'Horace Mann (partner)'
            },
            {
              'id': 3,
              'name': 'Special Education'
            },
            {
              'id': 14,
              'name': 'Kia (partner)'
            }
          ],
          'schoolName': 'R L Norton Elementary School',
          'schoolUrl': 'http://www.donorschoose.org/school/r-l-norton-elementary-school/53187/',
          'city': 'Snellville',
          'zip': '30039-5232',
          'state': 'GA',
          'stateFullName': 'Georgia',
          'latitude': '33.807476127271322',
          'longitude': '-84.030656226507972',
          'zone': {
            'id': '313',
            'name': 'Georgia'
          },
          'subject': {
            'id': '8',
            'name': 'Mathematics',
            'groupId': '4'
          },
          'resource': {
            'id': '2',
            'name': 'Technology'
          },
          'expirationDate': '2015-02-09',
          'fundingStatus': 'needs funding'
        },
        {
          'id': '1396593',
          'proposalURL': 'http://www.donorschoose.org/project/quick-computing-for-critical-thinking/1396593/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE',
          'fundURL': 'https://secure.donorschoose.org/donors/givingCart.html?proposalid=1396593&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE',
          'imageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u255269_sm.jpg?timestamp=1374701712477',
          'thumbImageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u255269_thmb.jpg?timestamp=1374701712477',
          'title': 'Quick Computing for Critical Thinking',
          'shortDescription': 'Albert Einstein once said, \'It\'s not that I am smart, I just stay with problems longer.\' I strive to teach my students this on a daily basis. Everything my students do in class pushes them to be...',
          'fulfillmentTrailer': 'My students need a basic four function calculator for quick computations.',
          'snippets': [

          ],
          'percentFunded': '80',
          'numDonors': '8',
          'costToComplete': '232.52',
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
          'totalPrice': '1167.52',
          'freeShipping': 'true',
          'teacherId': '255269',
          'teacherName': 'Ms. Townsend',
          'gradeLevel': {
            'id': '3',
            'name': 'Grades 6-8'
          },
          'povertyLevel': 'Highest Poverty',
          'teacherTypes': [
            {
              'id': 1,
              'name': 'Teach For America'
            }
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
              'id': 17,
              'name': 'Kia (partner)'
            }
          ],
          'schoolName': 'Latin Academy Charter School',
          'schoolUrl': 'http://www.donorschoose.org/school/latin-academy-charter-school/103598/',
          'city': 'Atlanta',
          'zip': '30310',
          'state': 'GA',
          'stateFullName': 'Georgia',
          'latitude': '33.724140167236328',
          'longitude': '-84.431312561035156',
          'zone': {
            'id': '313',
            'name': 'Georgia'
          },
          'subject': {
            'id': '8',
            'name': 'Mathematics',
            'groupId': '4'
          },
          'resource': {
            'id': '2',
            'name': 'Technology'
          },
          'expirationDate': '2015-02-15',
          'fundingStatus': 'needs funding'
        },
        {
          'id': '1439748',
          'proposalURL': 'http://www.donorschoose.org/project/ipads-for-ilearning/1439748/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE',
          'fundURL': 'https://secure.donorschoose.org/donors/givingCart.html?proposalid=1439748&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE',
          'imageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2646089_sm.jpg?timestamp=1417576600142',
          'thumbImageURL': 'https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2646089_thmb.jpg?timestamp=1417576600142',
          'title': 'ipads for ilearning',
          'shortDescription': 'Do you want to see your child fully engaged while learning? In my classroom we have started using our electronic devices to capture the students learning and interests. I have a classroom of 28...',
          'fulfillmentTrailer': 'My students need 2 ipad mini\'s and protective covers.',
          'snippets': [

          ],
          'percentFunded': '74',
          'numDonors': '19',
          'costToComplete': '228.99',
          'completedMatching': {
            'matchingKey': 'DISNEYP15',
            'ownerRegion': 'West',
            'name': 'Disney',
            'type': 'PROMO',
            'logoURL': 'https://a248.e.akamai.net/f/248/48906/2d/secure.donorschoose.org/images/logos/disney_small.jpg',
            'faqURL': 'http://www.donorschoose.org/donors/matching_grant_popup.html?matchingKey=DISNEYP15',
            'amount': '0.00',
            'completed': 'true',
            'description': '<p align=\'center\'><img src=\'https://a248.e.akamai.net/f/248/48906/2d/secure.donorschoose.org/images/logos/disney_small.jpg\'></p> \r\n\r\n<p>Disney is amplifying the impact of teachers who rally support for creativity projects in their classrooms. To be eligible for the DISNEY code, projects must demonstrate innovation and imagination and be for grades K-8 in at least one of the following subject areas: Literacy & Language, Music & The Arts, Math & Science, Health & Sports.</p>\r\n\r\n<p>Teachers, <a target=\'_blank\' href=\'http://help.donorschoose.org/hc/en-us/articles/204310233\'>here is how it works</a>. Disney is committed to nurturing creative thinking skills to inspire kids to create the future they imagine. We are excited to support DonorsChoose.org to help educators continue to activate their classrooms through creativity projects.</p>'
          },
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
          'totalPrice': '889.69',
          'freeShipping': 'true',
          'teacherId': '2646089',
          'teacherName': 'Mrs. Thompson',
          'gradeLevel': {
            'id': '2',
            'name': 'Grades 3-5'
          },
          'povertyLevel': '',
          'teacherTypes': [

          ],
          'schoolTypes': [
            {
              'id': 1,
              'name': 'Charter'
            }
          ],
          'schoolName': 'Starling Elementary',
          'schoolUrl': 'http://www.donorschoose.org/school/starling-elementary/97279/',
          'city': 'Grayson',
          'zip': '30017',
          'state': 'GA',
          'stateFullName': 'Georgia',
          'latitude': '33.903369000000000',
          'longitude': '-83.964585000000000',
          'zone': {
            'id': '313',
            'name': 'Georgia'
          },
          'subject': {
            'id': '10',
            'name': 'Literacy',
            'groupId': '6'
          },
          'additionalSubjects': [
            {
              'id': '8',
              'name': 'Mathematics',
              'groupId': '4'
            }
          ],
          'resource': {
            'id': '2',
            'name': 'Technology'
          },
          'expirationDate': '2015-04-02',
          'fundingStatus': 'needs funding'
        }
      ]
    };

    // Create a stubbed collection to use for testing the view
    var proposals = new Stem.Collections.Proposals();
    var ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', donorsChooseResponse);
    proposals.fetch();

    // Clean up from our stubs
    ajaxStub.restore();

    beforeEach(function () {
        this.ProposalsAsHighlightsView = new Stem.Views.ProposalsAsHighlights({
            collection: proposals
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.ProposalsAsHighlightsView.render().should.equal(this.ProposalsAsHighlightsView);
    });

    it('should render the appropriate number of rows', function() {
        this.ProposalsAsHighlightsView.render().$el.find('.row').length.should.equal(Math.floor((donorsChooseResponse.proposals.length-1)/4)+1);
    });

    it('should render multiple model views within each row', function() {
        var nRows = this.ProposalsAsHighlightsView.render().$el.find('.row').length,
            nProposals = donorsChooseResponse.proposals.length;
        this.ProposalsAsHighlightsView.render().$el.find('.row').each(function(idx) {
            $(this).find('.col-sm-3').length.should.equal(
                (idx === nRows-1) && (nProposals % 4) ? (nProposals % 4) : 4
            );
        });
    });

    it('should render the model views in order', function() {
        this.ProposalsAsHighlightsView.render().$el.find('.col-sm-4').each(function(idx) {
            $(this).find('h3').text().should.equal(donorsChooseResponse.proposals[idx].title);
        });
    });

});
