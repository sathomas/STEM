/*global before, describe, it, sinon, $, Stem  */

describe('TeacherSearch Model', function () {

    'use strict';

    var oaeResponse = [
        {
          "total": 119,
          "results": [
            {
              "id": "c:si:V1nB9rp",
              "resourceSubType": "file",
              "visibility": "public",
              "tenantAlias": "si",
              "thumbnailUrl": "/api/download/signed?uri=local%3Ac%2Fsi%2FV1%2FnB%2F9r%2FpH%2FV1nB9rpH%2Fpreviews%2Frev-si-NJxnBqrT%2Fthumbnail.jpg&expires=1429142400000&signature=a8c55699c975f8ad7cc6a6c877bba9b1d98fef21",
              "displayName": "2005 ASEE Spillover paper.pdf",
              "resourceType": "content",
              "mime": "application/pdf",
              "lastModified": "1427397419571",
              "tenant": {
                "alias": "si",
                "displayName": "Georgia STEM incubator"
              },
              "profilePath": "/content/si/V1nB9rp"
            },
            {
              "id": "c:si:Ny97qH6",
              "resourceSubType": "file",
              "visibility": "public",
              "tenantAlias": "si",
              "thumbnailUrl": "/api/download/signed?uri=local%3Ac%2Fsi%2FNy%2F97%2FqH%2F6T%2FNy97qH6T%2Fpreviews%2Frev-si-VJgc7qH6%2Fthumbnail.jpg&expires=1429142400000&signature=1bc868f962cfd3cc3c51334714a389a8ce403165",
              "displayName": "2009 ASEE Education Initiatives paper--final.pdf",
              "resourceType": "content",
              "mime": "application/pdf",
              "lastModified": "1427397385382",
              "tenant": {
                "alias": "si",
                "displayName": "Georgia STEM incubator"
              },
              "profilePath": "/content/si/Ny97qH6"
            }
          ]
        },{
          "total": 28,
          "results": [
            {
              "id": "g:si:VJS-R-T",
              "joinable": "no",
              "visibility": "public",
              "tenantAlias": "si",
              "thumbnailUrl": "/api/download/signed?uri=local%3Ag%2Fsi%2FVJ%2FS-%2FR-%2FTb%2FVJS-R-Tb%2Fprofilepictures%2F1427388795713%2Fmedium.jpg&expires=1429142400000&signature=5eefed9a57fc18b005e139bed6d8af5722d97880",
              "displayName": "Analytic Geometry Self-paced Course",
              "resourceType": "group",
              "tenant": {
                "alias": "si",
                "displayName": "Georgia STEM incubator"
              },
              "profilePath": "/group/si/VJS-R-T"
            },
            {
              "id": "g:si:4kDnHCs",
              "joinable": "no",
              "visibility": "public",
              "tenantAlias": "si",
              "thumbnailUrl": "/api/download/signed?uri=local%3Ag%2Fsi%2F4k%2FDn%2FHC%2Fsf%2F4kDnHCsf%2Fprofilepictures%2F1427310015056%2Fmedium.jpg&expires=1429142400000&signature=ce64f3443a18cabafee9be62997326e0e7022f47",
              "displayName": "Applied Genetics Self-paced Course",
              "resourceType": "group",
              "tenant": {
                "alias": "si",
                "displayName": "Georgia STEM incubator"
              },
              "profilePath": "/group/si/4kDnHCs"
            }
          ]
        },{
          "total": 273,
          "results": [
            {
              "id": "g:si:VkU5535",
              "joinable": "no",
              "visibility": "public",
              "tenantAlias": "si",
              "thumbnailUrl": "/api/download/signed?uri=local%3Ag%2Fsi%2FVk%2FU5%2F53%2F55%2FVkU55355%2Fprofilepictures%2F1427322681381%2Fmedium.jpg&expires=1429142400000&signature=22d4425a8a3d0474b86f8ea91384ecb64c205766",
              "displayName": "AMP-IT-UP",
              "resourceType": "group",
              "tenant": {
                "alias": "si",
                "displayName": "Georgia STEM incubator"
              },
              "profilePath": "/group/si/VkU5535"
            },
            {
              "id": "g:si:E1DG9Ai",
              "joinable": "no",
              "displayName": "APS-Forrest Hills Academy",
              "tenantAlias": "si",
              "visibility": "public",
              "resourceType": "group",
              "tenant": {
                "alias": "si",
                "displayName": "Georgia STEM incubator"
              },
              "profilePath": "/group/si/E1DG9Ai"
            }
          ]
        }
    ];

    before(function () {
        var ajaxStub = sinon.stub($, 'ajax');
        ajaxStub.onCall(0).yieldsTo('success', oaeResponse[0]);
        ajaxStub.onCall(1).yieldsTo('success', oaeResponse[1]);
        ajaxStub.onCall(3).yieldsTo('success', oaeResponse[2]);
        this.TeacherSearchModel = new Stem.Models.TeacherSearch();
        ajaxStub.restore();
    });


    it('should create a search query model if none was provided', function () {
        this.TeacherSearchModel.get('searchQuery').should.not.be.empty();
        this.TeacherSearchModel.get('searchQuery').get('label').should.equal('Search resources');
        this.TeacherSearchModel.get('searchQuery').get('placeholder').should.equal('Search the Incubator');
    });

    it('should create a tag set for grade levels', function () {
        this.TeacherSearchModel.get('gradeLevelTags').should.not.be.empty();
        this.TeacherSearchModel.get('gradeLevelTagSet').should.not.be.empty();
        this.TeacherSearchModel.get('gradeLevelTagSet').get('title').should.equal('Grade level');
        this.TeacherSearchModel.get('gradeLevelTagSet').get('tags').should.equal(this.TeacherSearchModel.get('gradeLevelTags'));
    });

    it('should augment the query string from tags', function () {
        this.TeacherSearchModel.get('gradeLevelTags').at(0).set('selected',true);
        this.TeacherSearchModel.getQueryTags().should.equal(
            ', "primary school"' +
            ', "elementary school"' +
            ', p-2, k-2' +
            ', preschool, kindergarten' +
            ', "1st grade", "first grade"' +
            ', "2nd grade", "second grade"'
        );
        this.TeacherSearchModel.get('gradeLevelTags').at(0).set('selected',false);
        this.TeacherSearchModel.get('gradeLevelTags').at(1).set('selected',true);
        this.TeacherSearchModel.getQueryTags().should.equal(
            ', "primary school"' +
            ', "elementary school"' +
            ', 3-5, "3rd grade", "third grade"' +
            ', "4th grade", "fourth grade"' +
            ', "5th grade", "fifth grade"'
        );
        this.TeacherSearchModel.get('gradeLevelTags').at(1).set('selected',false);
        this.TeacherSearchModel.get('gradeLevelTags').at(2).set('selected',true);
        this.TeacherSearchModel.getQueryTags().should.equal(
            ', "secondary school"' +
            ', 6-8, "middle school"' +
            ', "6th grade", "sixth grade"' +
            ', "7th grade", "seventh grade"' +
            ', "8th grade", "eighth grade"'
        );
        this.TeacherSearchModel.get('gradeLevelTags').at(2).set('selected',false);
        this.TeacherSearchModel.get('gradeLevelTags').at(3).set('selected',true);
        this.TeacherSearchModel.getQueryTags().should.equal(
            ', "secondary school"' +
            ', 9-12, "high school"' +
            ', "9th grade", "ninth grade"' +
            ', "10th grade", "tenth grade"' +
            ', "11th grade", "eleventh grade"' +
            ', "12th grade", "twelfth grade"'
        );
        this.TeacherSearchModel.get('gradeLevelTags').at(3).set('selected',false);
    });

    it('should update filters when facet is set', function () {
        this.TeacherSearchModel.set('facet','courses');
        this.TeacherSearchModel.get('facets').courses.filter.get('selected').should.be.true();
    });

});
