/* jshint sub: true */
/*global before, describe, it, sinon, $, Stem  */

describe('ContentsGroup Collection', function () {
    'use strict';

    var oaeResponse = {
      "total": 4,
      "results": [
        {
          "id": "c:si:4kO-rx3",
          "resourceSubType": "file",
          "visibility": "public",
          "tenantAlias": "si",
          "thumbnailUrl": "/api/download/signed?uri=local%3Ac%2Fsi%2F4k%2FO-%2Frx%2F3L%2F4kO-rx3L%2Fpreviews%2Frev-si-Eyykv8C%2Fthumbnail.jpg&expires=1432166400000&signature=8aa039c47227cdfac54e51aa9921c5b973dad269",
          "displayName": "Life Science-Biology-Applied Genetics Course Syllabus .pdf",
          "resourceType": "content",
          "mime": "application/pdf",
          "lastModified": "1427466174668",
          "tenant": {
            "alias": "si",
            "displayName": "Georgia STEM incubator"
          },
          "profilePath": "/content/si/4kO-rx3"
        },
        {
          "id": "c:si:N1AWOlh",
          "resourceSubType": "file",
          "visibility": "public",
          "tenantAlias": "si",
          "thumbnailUrl": "/api/download/signed?uri=local%3Ac%2Fsi%2FN1%2FAW%2FOl%2Fho%2FN1AWOlho%2Fpreviews%2Frev-si-V1UIL80%2Fthumbnail.jpg&expires=1432166400000&signature=4a1535d3877f12db0f94fcd13dded18b301f2bb3",
          "displayName": "Life Science-Biology-Human Cell Biology Course Syllabus-6-8, 9-12.pdf",
          "resourceType": "content",
          "mime": "application/pdf",
          "lastModified": "1431358420482",
          "tenant": {
            "alias": "si",
            "displayName": "Georgia STEM incubator"
          },
          "profilePath": "/content/si/N1AWOlh"
        },
        {
          "id": "c:si:VkA-1lh",
          "resourceSubType": "file",
          "visibility": "public",
          "tenantAlias": "si",
          "thumbnailUrl": "/api/download/signed?uri=local%3Ac%2Fsi%2FVk%2FA-%2F1l%2Fhg%2FVkA-1lhg%2Fpreviews%2Frev-si-NJUJeUA%2Fthumbnail.jpg&expires=1432166400000&signature=83ea0f483912b0e04c053055e40e7c41e17253d4",
          "displayName": "Mathematics-Middle School Statistics Course Syllabus.pdf",
          "resourceType": "content",
          "mime": "application/pdf",
          "lastModified": "1427464389199",
          "tenant": {
            "alias": "si",
            "displayName": "Georgia STEM incubator"
          },
          "profilePath": "/content/si/VkA-1lh"
        },
        {
          "id": "c:si:mJcW8pMq",
          "resourceSubType": "file",
          "visibility": "public",
          "tenantAlias": "si",
          "thumbnailUrl": "/api/download/signed?uri=local%3Ac%2Fsi%2FmJ%2FcW%2F8p%2FMq%2FmJcW8pMq%2Fpreviews%2Frev-si-m1lq-8TMq%2Fthumbnail.jpg&expires=1432166400000&signature=f30ce74ac7acd4dec9f53cafae715ce19815a541",
          "displayName": "Project-Based Inquiry Learning Online Course",
          "resourceType": "content",
          "mime": "application/pdf",
          "lastModified": "1427239554196",
          "tenant": {
            "alias": "si",
            "displayName": "Georgia STEM incubator"
          },
          "profilePath": "/content/si/mJcW8pMq"
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
        query.split('&').forEach(function(part) {
            var item = part.split('=');
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
    };

    before(function () {
        var ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', oaeResponse);
        this.ContentsGroupCollection = new Stem.Collections.ContentsGroup([],{parentId: 'ParentId'});
        this.ContentsGroupCollection.fetch({validate:true});
        ajaxStub.restore();
    });

    it('should generate the correct default URL to access the OAE', function() {
        parseURL(this.ContentsGroupCollection.url())['protocol'].should.equal(Stem.config.oae.protocol);
        parseURL(this.ContentsGroupCollection.url())['host'].should.equal(Stem.config.oae.host);
        parseURL(this.ContentsGroupCollection.url())['pathname'].should.equal('/api/search/content-library/ParentId');
    });

    it('should include specified size limit in the request URL', function() {
        parseURL((new Stem.Collections.ContentsGroup([], {limit: 5})).url()).queries['limit'].should.equal('5');
    });

    it('should parse the response from the OAE', function() {
        this.ContentsGroupCollection.length.should.equal(4);
    });

    it('should return current options when requested', function() {
        var ContentsGroupCollection = new Stem.Collections.ContentsGroup([], {limit: 5});
        ContentsGroupCollection.options().limit.should.equal(5);
    });

    it('should set options dynamically', function() {
        this.ContentsGroupCollection.options({limit: 10});
        this.ContentsGroupCollection.options().limit.should.equal(10);
    });

    it('should abort in-flight requests on new request', function() {
        var xhrStub = sinon.useFakeXMLHttpRequest();
        var xhrs = [];
        xhrStub.onCreate = function (xhr) { xhrs.push(xhr); };
        this.ContentsGroupCollection.fetch();
        xhrs.length.should.equal(1);
        this.ContentsGroupCollection.fetch();
        xhrs.length.should.equal(2);
        xhrs[0].aborted.should.be.true();
        xhrStub.restore();
    });

});
