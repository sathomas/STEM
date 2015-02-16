/*global beforeEach, describe, it, $  */

describe('CompletedProposalsAsFeaturedDetails View', function () {
    'use strict';

    // The following is the actual response of DonorsChoose to the GET request
    // `http://api.donorschoose.org/common/json_feed.html?APIKey=DONORSCHOOSE&state=GA&subject4=-4&max=4&historical=true`
    // as captured on 2015-02-16.

    var donorsChooseResponse = {
      "searchTerms": "Math &amp; Science &gt; GA",
      "searchURL": "http://www.donorschoose.org/donors/search.html?state=GA&historical=true&subject4=-4&utm_source=api&utm_medium=feed&utm_content=searchlink&utm_campaign=DONORSCHOOSE",
      "totalProposals": "5521",
      "index": "0",
      "max": "4",
      "breadcrumb": [
        [
          "state",
          "GA",
          "Georgia"
        ],
        [
          "subject4",
          "-4",
          "Math &amp; Science"
        ],
        [
          "max",
          "4",
          ""
        ],
        [
          "historical",
          "true",
          "Completed"
        ]
      ],
      "proposals": [
        {
          "id": "1400094",
          "proposalURL": "http://www.donorschoose.org/project/connecting-reading-to-math-and-science/1400094/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE",
          "fundURL": "https://secure.donorschoose.org/donors/givingCart.html?proposalid=1400094&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE",
          "imageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2048950_sm.jpg?timestamp=1381456033809",
          "thumbImageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2048950_thmb.jpg?timestamp=1381456033809",
          "title": "Connecting Reading to Math and Science",
          "shortDescription": "With budgets strapped on getting new materials, I am finding a shortage with getting classroom sets of books. I really want to focus on non-fiction. I want to bridge the gap of literature with...",
          "fulfillmentTrailer": "My students need more math and science texts to read in class. This way we can work on both language arts standards while reinforcing math and science standards.",
          "snippets": [

          ],
          "percentFunded": "100",
          "numDonors": "7",
          "costToComplete": "0.00",
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
          "totalPrice": "690.54",
          "freeShipping": "false",
          "teacherId": "2048950",
          "teacherName": "Mr. Rippy",
          "gradeLevel": {
            "id": "2",
            "name": "Grades 3-5"
          },
          "povertyLevel": "",
          "teacherTypes": [

          ],
          "schoolTypes": [
            {
              "id": 14,
              "name": "Kia (partner)"
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
          "schoolName": "",
          "schoolUrl": "",
          "city": "",
          "zip": "",
          "state": "GA",
          "stateFullName": "Georgia",
          "latitude": "",
          "longitude": "",
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
              "id": "8",
              "name": "Mathematics",
              "groupId": "4"
            }
          ],
          "resource": {
            "id": "1",
            "name": "Books"
          },
          "expirationDate": "2015-02-21",
          "fundingStatus": "funded",
          "fullyFundedDate": "Friday, December 19, 2014 4:31:40 PM EST",
          "waitingForCheckPayment": "false",
          "modifiedDate": "Monday, February 16, 2015 5:00:00 AM EST",
          "thankYouAssets": {
            "interimThankYou": "I am so excited to find out that my Connecting Reading to Math and Science project has been completely funded. I want to thank each of you for making this happen. The timing of this project works perfect with our upcoming informational reading units. \r\n\r\nI expect to use the subscriptions to merge reading, writing, with our math and science standards. I am looking forward to sending my thank you package to show you just how much your support will help our students in my classroom. Thank you for your time and investment in helping educate our students with new tools.\n\nWith gratitude,\nMr. Rippy",
            "interimThankYouDate": "Friday, December 19, 2014 5:21:01 PM EST",
            "photos": [
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1400094_001_sm.jpg?timestamp=1424063315808",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1400094_002_sm.jpg?timestamp=1424063357824",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1400094_003_sm.jpg?timestamp=1424063408262",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1400094_004_sm.jpg?timestamp=1424063503862",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1400094_005_sm.jpg?timestamp=1424063550818",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1400094_006_sm.jpg?timestamp=1424063630053"
            ],
            "resultsLetter": "Thank you very much for the math and science articles for my language arts class. My students have really enjoyed these current articles that involve non-fictional subjects. There are plenty of math and science subjects to weave in. I have been able to teach inferences and textual features at the same time my students have been learning about engineering jobs, head injury prevention, dinosaurs, sharks, and school topics in debate. \r\n\r\nWe use the articles as part of our daily reading. The classroom becomes a quiet place as the students look deeper into the readers. I am actually more impressed on how well these peak my student&#039;s interest than I thought. They not only enjoy the feature articles, but it really hits home when the see the debatable subjects. We spend about 20 minutes discussing inferences and deeper level questions. The booklet on tornadoes and natural disasters really peaked the student&#039;s interest. \r\n\r\nThank you for allowing me to teach these important subjects at the same time my students learn about improving their reading and language arts.\r\n\r\nI am making a point to take care of these, so they can last a long time.\n\nWith gratitude,\nMr. Rippy",
            "resultsLetterDate": "Monday, February 16, 2015 12:23:05 AM EST"
          }
        },
        {
          "id": "1494796",
          "proposalURL": "http://www.donorschoose.org/project/help-me-become-a-better-teacher/1494796/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE",
          "fundURL": "https://secure.donorschoose.org/donors/givingCart.html?proposalid=1494796&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE",
          "imageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u412050_sm.jpg?timestamp=1422322932461",
          "thumbImageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u412050_thmb.jpg?timestamp=1422322932461",
          "title": "Help Me Become a Better Teacher!",
          "shortDescription": "Adding an iPad and a document camera would allow me as a teacher to...",
          "fulfillmentTrailer": "Teacher Professional Development: I need an iPad and document camera to improve my teaching. <profdevpilot>",
          "snippets": [

          ],
          "percentFunded": "100",
          "numDonors": "2",
          "costToComplete": "0.00",
          "completedMatching": {
            "matchingKey": "GATESPDPAH15",
            "ownerRegion": "West",
            "name": "Bill &amp; Melinda Gates Foundation",
            "type": "ALMOST_HOME",
            "logoURL": "https://a248.e.akamai.net/f/248/48906/2d/secure.donorschoose.org/images/logos/gates_small.gif",
            "faqURL": "http://www.donorschoose.org/donors/matching_grant_popup.html?matchingKey=GATESPDPAH15",
            "amount": "0.00",
            "completed": "true",
            "description": "<p align=\"center\"><img src=\"https://a248.e.akamai.net/f/248/48906/2d/secure.donorschoose.org/images/logos/gates_large.gif\">\r\n\r\n<p>You can bring this project to life for less than $100!</p>\r\n\r\n<p>Thanks to funding from the Bill & Melinda Gates Foundation, this project is \"Almost Home!\" DonorsChoose.org will fund most of this project if someone like you provides the remainder. By completing this project you will leverage the impact of your donation.</p>\r\n\r\n<p>The Bill & Melinda Gates Foundation is pleased to support this project as part of DonorsChoose.org's professional development pilot program. Nobody knows teaching like teachers, and this pilot will enable teachers to capitalize on the ideas that they think, at an individual level, will help their own development the most.</p>\r\n\r\n<p><a target=\"_blank\" href=\"../donors/search.html?matchingId=842\">See all projects eligible for this match offer.</a></p>"
          },
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
            "deadline": "February 18",
            "code": "SPARK",
            "matchingKey": "teacherProm6",
            "ownerRegion": "Marketing",
            "name": "Matching Donor",
            "type": "PROMO",
            "logoURL": "",
            "description": ""
          },
          "totalPrice": "795.01",
          "freeShipping": "true",
          "teacherId": "412050",
          "teacherName": "Mrs. Howell",
          "gradeLevel": {
            "id": "1",
            "name": "Grades PreK-2"
          },
          "povertyLevel": "Highest Poverty",
          "teacherTypes": [

          ],
          "schoolTypes": [
            {
              "id": 1,
              "name": "Charter"
            }
          ],
          "schoolName": "The Academy for Classical Education",
          "schoolUrl": "http://www.donorschoose.org/school/the-academy-for-classical-education/105692/",
          "city": "Macon",
          "zip": "31210",
          "state": "GA",
          "stateFullName": "Georgia",
          "latitude": "32.936477661132813",
          "longitude": "-83.729148864746100",
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
              "id": "8",
              "name": "Mathematics",
              "groupId": "4"
            }
          ],
          "resource": {
            "id": "2",
            "name": "Technology"
          },
          "expirationDate": "2015-06-10",
          "fundingStatus": "funded",
          "fullyFundedDate": "Monday, February 16, 2015 12:39:58 AM EST",
          "waitingForCheckPayment": "false",
          "modifiedDate": "Monday, February 16, 2015 5:00:00 AM EST",
          "thankYouAssets": {
            "interimThankYou": "",
            "interimThankYouDate": "",
            "photos": [

            ],
            "resultsLetter": "",
            "resultsLetterDate": ""
          }
        },
        {
          "id": "1325092",
          "proposalURL": "http://www.donorschoose.org/project/young-readers-rev-your-engines-catch-t/1325092/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE",
          "fundURL": "https://secure.donorschoose.org/donors/givingCart.html?proposalid=1325092&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE",
          "imageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u373389_sm.jpg?timestamp=1387250507690",
          "thumbImageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u373389_thmb.jpg?timestamp=1387250507690",
          "title": "Young Readers-Rev Your Engines &amp; Catch the Everything Cart",
          "shortDescription": "Do you remember how overwhelming it was when you were younger to try and find a non fiction book in the library amongst all of the endless titles that were for the \"older kids\"? The Pk -5 students...",
          "fulfillmentTrailer": "My students need a Smith Systems Everything Book Cart to help organize the  Pk-2 Non Fiction books  STEM books in our library.",
          "snippets": [

          ],
          "percentFunded": "100",
          "numDonors": "4",
          "costToComplete": "0.00",
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
          "totalPrice": "647.44",
          "freeShipping": "true",
          "teacherId": "373389",
          "teacherName": "Ms. Levine",
          "gradeLevel": {
            "id": "1",
            "name": "Grades PreK-2"
          },
          "povertyLevel": "High Poverty",
          "teacherTypes": [

          ],
          "schoolTypes": [
            {
              "id": 14,
              "name": "Kia (partner)"
            },
            {
              "id": 3,
              "name": "Special Education"
            }
          ],
          "schoolName": "",
          "schoolUrl": "",
          "city": "",
          "zip": "",
          "state": "GA",
          "stateFullName": "Georgia",
          "latitude": "",
          "longitude": "",
          "zone": {
            "id": "313",
            "name": "Georgia"
          },
          "subject": {
            "id": "6",
            "name": "Applied Sciences",
            "groupId": "4"
          },
          "additionalSubjects": [
            {
              "id": "4",
              "name": "Health &amp; Life Science",
              "groupId": "4"
            }
          ],
          "resource": {
            "id": "6",
            "name": "Other"
          },
          "expirationDate": "2015-01-01",
          "fundingStatus": "funded",
          "fullyFundedDate": "Monday, October 6, 2014 9:32:32 PM EDT",
          "waitingForCheckPayment": "false",
          "modifiedDate": "Monday, February 16, 2015 5:00:00 AM EST",
          "thankYouAssets": {
            "interimThankYou": "Thank you so much to the donors and a special thank you to the Chevron Fuel Your School Program!!!!!\r\n\r\nThanks to your support, the youngest students will be able to find the non fiction books! This is a big deal! Little ones have a hard time finding just right books in the mix of higher level books. The shelves are overwhelming!\r\n\r\nWhat I love about this cart is it can be wheeled easily anywhere in the library to supplement the lesson by bringing the materials right to the students and they can browse wherever the action is!\r\n\r\nThanks so much for supporting my students and fueling their minds!!!\n\nWith gratitude,\nMs. Levine",
            "interimThankYouDate": "Monday, October 6, 2014 10:38:15 PM EDT",
            "photos": [
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1325092_001_sm.jpg?timestamp=1424065317567",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1325092_002_sm.jpg?timestamp=1424065361551",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1325092_003_sm.jpg?timestamp=1424065436081",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1325092_004_sm.jpg?timestamp=1424065465186",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1325092_005_sm.jpg?timestamp=1424065529653",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1325092_006_sm.jpg?timestamp=1424065607662"
            ],
            "resultsLetter": "THANK YOU!!\r\n\r\nThe students were thrilled when the giant box came to our school. They were shocked to see that we received a GIANT PURPLE book cart! They instantly raved about the awesome color! The students love when the library gets something new but this--well this is the best addition to date!\r\n\r\nThis purple book cart is being used to organize the (early reader) non fiction books for so that the younger kids can find informational texts quickly and easily!\r\n\r\nThis book cart gives student learning a big boost because non fiction texts help to make kids smarter and more engaged in their learning. We are in the early stages of building the early reader non fiction collection and this is a great start!\r\n\r\nThanks again for supporting our students and our school library!\n\nWith gratitude,\nMs. Levine",
            "resultsLetterDate": "Monday, February 16, 2015 12:56:06 AM EST"
          }
        },
        {
          "id": "1383252",
          "proposalURL": "http://www.donorschoose.org/project/notes-for-math/1383252/?utm_source=api&utm_medium=feed&utm_content=bodylink&utm_campaign=DONORSCHOOSE",
          "fundURL": "https://secure.donorschoose.org/donors/givingCart.html?proposalid=1383252&donationAmount=45&utm_source=api&utm_medium=feed&utm_content=fundlink&utm_campaign=DONORSCHOOSE",
          "imageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/small/u2458281_sm.jpg?timestamp=1412727374786",
          "thumbImageURL": "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/user/thumbnail/u2458281_thmb.jpg?timestamp=1412727374786",
          "title": "Notes for Math",
          "shortDescription": "I am Mrs. Baldwin, a 7th-grade mathematics teacher. I teach a great group of students who show up every day, always putting their personal hardships from home aside to get an education. Their...",
          "fulfillmentTrailer": "My students need 12 packs of pencils, 25 composition notebooks, and 20 packs of highlighters to improve their note taking skills in math.",
          "snippets": [

          ],
          "percentFunded": "100",
          "numDonors": "3",
          "costToComplete": "0.00",
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
          "totalPrice": "164.05",
          "freeShipping": "true",
          "teacherId": "2458281",
          "teacherName": "Mrs. Baldwin",
          "gradeLevel": {
            "id": "3",
            "name": "Grades 6-8"
          },
          "povertyLevel": "Highest Poverty",
          "teacherTypes": [

          ],
          "schoolTypes": [
            {
              "id": 12,
              "name": "Horace Mann (partner)"
            }
          ],
          "schoolName": "",
          "schoolUrl": "",
          "city": "",
          "zip": "",
          "state": "GA",
          "stateFullName": "Georgia",
          "latitude": "",
          "longitude": "",
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
            "id": "3",
            "name": "Supplies"
          },
          "expirationDate": "2015-02-07",
          "fundingStatus": "funded",
          "fullyFundedDate": "Wednesday, October 15, 2014 12:42:29 PM EDT",
          "waitingForCheckPayment": "false",
          "modifiedDate": "Tuesday, February 10, 2015 5:00:00 AM EST",
          "thankYouAssets": {
            "interimThankYou": "I would like to sincerely thank you from the bottom of my heart for your kindness and generosity. My project has been funded, and this news has made my seventh graders and I very happy. My students are a great bunch of kids and together we will help them on their road to academic success. \r\n\r\nWith these supplies my students will improve their note taking skills and learn to write mathematically. I am confident that this will improve their understanding of Math and they will learn valuable skills that can be transferred to any subject area. We appreciate you. Thanks a million.\n\nWith gratitude,\nMrs. Baldwin",
            "interimThankYouDate": "Wednesday, October 15, 2014 10:57:11 PM EDT",
            "photos": [
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1383252_001_sm.jpg?timestamp=1424061185732",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1383252_002_sm.jpg?timestamp=1424061186640",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1383252_003_sm.png?timestamp=1424061582719",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1383252_004_sm.jpg?timestamp=1424061583640",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1383252_005_sm.jpg?timestamp=1424061584848",
              "https://a248.e.akamai.net/f/248/48906/1h/s3.amazonaws.com/donorschoose-storage/dc_prod/images/thankyou/small/p1383252_006_sm.jpg?timestamp=1424061585772"
            ],
            "resultsLetter": "Thanks to you, many 7th graders are on their way to success this academic school year. The idea that people they do not even know cared enough to donate much needed supplies to them have really touch their hearts. Their reaction was priceless. The students were very complementary about the individuals who helped. One student said, &#034;It&#039;s really good to know that there are nice people in the world&#034;. \r\n\r\nStudents in need of a notebook, highlighters or pencils are no longer embarrassed to ask for them. Students who received notebooks are using them to take notes and practice math problems in class. All students are using the high lighters to identify key terms for vocabulary and important information needed to solve problems. The pencils are being used daily by students who do not have pencils but want to do their work. \r\n\r\nSince receiving these supplies, I have seen an increase in the confidence level of many students in their approach to mathematics. There has been an improvement in their overall grades on quizzes and tests. Vocabulary fluency has reached an all time high for students who were struggling at the beginning of the school year. We were also able to use the project and its process to discuss our International Baccalaureate (IB) learner profile attributes such as caring and principled.\r\n\r\nAgain, thank you for all you do for our kids. You are a part of their lives too.\n\nWith gratitude,\nMrs. Baldwin",
            "resultsLetterDate": "Tuesday, February 10, 2015 9:35:53 AM EST"
          }
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
        this.CompletedProposalsAsFeaturedDetails = new Stem.Views.CompletedProposalsAsFeaturedDetails({collection: proposals});
    });

    it('render method should return the view (for chaining)', function() {
        this.CompletedProposalsAsFeaturedDetails.render().should.equal(this.CompletedProposalsAsFeaturedDetails);
    });

    it('should render the appropriate number of models', function() {
        this.CompletedProposalsAsFeaturedDetails.render().$el.find('.featured__details__text').length.should.equal(donorsChooseResponse.proposals.length);
    });

});
