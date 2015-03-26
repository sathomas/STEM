/* jshint sub: true */
/* global Stem, $, before, describe, it, sinon */

describe('Content Collection', function () {

    'use strict';

    // The following is the actual response of OAE to the GET request
    // `https://stemincubator.oae-qa1.oaeproject.org/api/search/general?resourceTypes=content&scope=_tenant`
    // as captured on 2015-02-16.

    var contentResponse = {
      'total': 8,
      'results': [
        {
          'id': 'c:si:mJUrPXgD',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'description': 'Daily lesson plans for hands-on modeling with geometry unit.',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2FmJ%2FUr%2FPX%2FgD%2FmJUrPXgD%2Fpreviews%2Frev-si-7JgUrwmlP%2Fthumbnail.jpg&expires=1424908800000&signature=4eee4200ae829a9ec115cad9b48215064d981143',
          'displayName': 'Geometry Modeling Daily Lesson Plans - High School - Math',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423852077627',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/mJUrPXgD'
        },
        {
          'id': 'c:si:XyPSP7gw',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'description': 'Supplementary materials for hands-on geometry modeling unit.',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2FXy%2FPS%2FP7%2Fgw%2FXyPSP7gw%2Fpreviews%2Frev-si-7JxPHv7xP%2Fthumbnail.jpg&expires=1424908800000&signature=ac7a1da295cd587daaff2645f4dff15b32292a0b',
          'displayName': 'Geometry Modeling Suppl - High School - Math',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423831012735',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/XyPSP7gw'
        },
        {
          'id': 'c:si:QJsLt7lD',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'description': 'Activity sheet for learning a zillion lesson.',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2FQJ%2FsL%2Ft7%2FlD%2FQJsLt7lD%2Fpreviews%2Frev-si-71xjIFmeP%2Fthumbnail.jpg&expires=1424908800000&signature=611d92d335dc50d3b50181200518533f73ce7c81',
          'displayName': 'Learn Zillion Activity - Middle School - Math',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423851971229',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/QJsLt7lD'
        },
        {
          'id': 'c:si:QyOrP7lv',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'description': 'Introduction to unit of hands-on modeling for Geometry',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2FQy%2FOr%2FP7%2Flv%2FQyOrP7lv%2Fpreviews%2Frev-si-myldSDXeP%2Fthumbnail.jpg&expires=1424908800000&signature=1bfa5408cc2a934328f94b7fe929d0a2a78dab86',
          'displayName': 'Modeling Geometry Intro - High School - Math',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423830888484',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/QyOrP7lv'
        },
        {
          'id': 'c:si:X16UFQgw',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'description': 'Activity summary for linear equations through teeter totter unit.',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2FX1%2F6U%2FFQ%2Fgw%2FX16UFQgw%2Fpreviews%2Frev-si-Q1epLt7xD%2Fthumbnail.jpg&expires=1424908800000&signature=16c4b805b54f1f9d00ebf9637a2a9f1df6f71c27',
          'displayName': 'Teeter Totter Activity Summary - Middle School - Math',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423851726418',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/X16UFQgw'
        },
        {
          'id': 'c:si:QkWTIFXev',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'description': 'Rubric for unit on solving linear equations with a teeter totter.',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2FQk%2FWT%2FIF%2FXe%2FQkWTIFXev%2Fpreviews%2Frev-si-7JzTUt7ew%2Fthumbnail.jpg&expires=1424908800000&signature=f2d4bde7b649454de8d6c50b11da42b4de945b7f',
          'displayName': 'Teeter Totter Rubric - Middle School - Math',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423851603150',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/QkWTIFXev'
        },
        {
          'id': 'c:si:71hIY7xP',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'description': 'Overview of Linear Equations through a Teeter Totter unit.',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2F71%2FhI%2FY7%2FxP%2F71hIY7xP%2Fpreviews%2Frev-si-Qkl3It7eP%2Fthumbnail.jpg&expires=1424908800000&signature=d1f2d45ab38c38e08df83d5c7814394c8cd50af7',
          'displayName': 'Teeter Totter overview - Middle School - Math',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423851793026',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/71hIY7xP'
        },
        {
          'id': 'c:si:m1ih5UxP',
          'resourceSubType': 'file',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ac%2Fsi%2Fm1%2Fih%2F5U%2FxP%2Fm1ih5UxP%2Fpreviews%2Frev-si-myVSWcgw%2Fthumbnail.jpg&expires=1424908800000&signature=c180def3f51eafe6cbb3ee2e803752527784dccf',
          'displayName': 'broke.pdf',
          'resourceType': 'content',
          'mime': 'application/pdf',
          'lastModified': '1423857930722',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          },
          'profilePath': '/content/si/m1ih5UxP'
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

    before(function() {
        var ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', contentResponse);
        this.ContentCollection = new Stem.Collections.Content();
        this.ContentCollection.fetch();
        ajaxStub.restore();
    });

    it('should generate the correct default URL to access the OAE', function() {
        parseURL(this.ContentCollection.url())['protocol'].should.equal(Stem.config.oae.protocol);
        parseURL(this.ContentCollection.url())['host'].should.equal(Stem.config.oae.host);
        parseURL(this.ContentCollection.url())['pathname'].should.equal('/api/search/general');
        parseURL(this.ContentCollection.url()).queries['resourceTypes'].should.equal('content');
        parseURL(this.ContentCollection.url()).queries['scope'].should.equal('_tenant');
    });

    it('should include specified keywords in the request URL', function() {
        parseURL((new Stem.Collections.Content([], {keywords: 'one two'})).url()).queries['q'].should.equal('one two');
    });

    it('should include specified size limit in the request URL', function() {
        parseURL((new Stem.Collections.Content([], {limit: 5})).url()).queries['limit'].should.equal('5');
    });

    it('should parse the response from the OAE', function() {
        this.ContentCollection.length.should.equal(8);
    });

    it('should create models from the OAE response', function() {
        this.ContentCollection.at(0).get('description').should.equal(contentResponse.results[0].description);
        this.ContentCollection.at(1).get('description').should.equal(contentResponse.results[1].description);
    });

    it('should return current options when requested', function() {
        this.ContentCollection = new Stem.Collections.Content([], {limit: 5});
        this.ContentCollection.options().limit.should.equal(5);
    });

    it('should set options dynamically', function() {
        this.ContentCollection.options({limit: 10});
        this.ContentCollection.options().limit.should.equal(10);
    });

    it('should abort in-flight requests on new request', function() {
        var xhrStub = sinon.useFakeXMLHttpRequest();
        var xhrs = [];
        xhrStub.onCreate = function (xhr) { xhrs.push(xhr); };
        this.ContentCollection.fetch();
        xhrs.length.should.equal(1);
        this.ContentCollection.fetch();
        xhrs.length.should.equal(2);
        xhrs[0].aborted.should.be.true();
        xhrStub.restore();
    });

});
