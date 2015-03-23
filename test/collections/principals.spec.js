/* jshint sub: true */
/*global before, describe, it, sinon, $, Stem  */

describe('Principals Collection', function () {
    'use strict';

    // The following is the actual response of OAE to the GET request
    // `http://stemincubator.oae-qa1.oaeproject.org/api/search/general?resourceTypes=group&scope=_tenant`
    // as captured on 2015-02-17

    var oaeResponse = {
      'total': 8,
      'results': [
        {
          'id': 'g:si:QyYrZQlw',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2FQy%2FYr%2FZQ%2Flw%2FQyYrZQlw%2Fprofilepictures%2F1423854122691%2Fmedium.jpg&expires=1424908800000&signature=828f29789265a9a39c3ac2e8182a8f43ec4921fa',
          'displayName': 'CEISMC',
          'resourceType': 'group',
          'profilePath': '/group/si/QyYrZQlw',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
        },
        {
          'id': 'g:si:mkfFmmeD',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2Fmk%2FfF%2Fmm%2FeD%2FmkfFmmeD%2Fprofilepictures%2F1423845286721%2Fmedium.jpg&expires=1424908800000&signature=98ddbbe7c057ce57173cf84b984682accc26f99d',
          'displayName': 'GIFT Teachers',
          'resourceType': 'group',
          'profilePath': '/group/si/mkfFmmeD',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
        },
        {
          'id': 'g:si:mJUHSXeP',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2FmJ%2FUH%2FSX%2FeP%2FmJUHSXeP%2Fprofilepictures%2F1423857759675%2Fmedium.jpg&expires=1424908800000&signature=944ff21073d90c2e23de074b0e7d54311e26532f',
          'displayName': 'Hands-On Math - High School - Math',
          'resourceType': 'group',
          'profilePath': '/group/si/mJUHSXeP',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
        },
        {
          'id': 'g:si:7JTnO7eP',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2F7J%2FTn%2FO7%2FeP%2F7JTnO7eP%2Fprofilepictures%2F1423857514357%2Fmedium.jpg&expires=1424908800000&signature=7b7e0e0df45556b22a2259adc8e4e4ccdcb953fc',
          'displayName': 'Hands-on Math - Middle School - Math',
          'resourceType': 'group',
          'profilePath': '/group/si/7JTnO7eP',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
        },
        {
          'id': 'g:si:XJqVXmxP',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2FXJ%2FqV%2FXm%2FxP%2FXJqVXmxP%2Fprofilepictures%2F1423845596215%2Fmedium.jpg&expires=1424908800000&signature=f3f19415621fc76b8ebbe7c57468dd5517eb3e25',
          'displayName': 'Innovation in Teaching Competition',
          'resourceType': 'group',
          'profilePath': '/group/si/XJqVXmxP',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
        },
        {
          'id': 'g:si:X1Y3TYev',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2FX1%2FY3%2FTY%2Fev%2FX1Y3TYev%2Fprofilepictures%2F1423857392024%2Fmedium.jpg&expires=1424908800000&signature=764635e9a16c63412e18ac0e243db1e77b1fbcf6',
          'displayName': 'Interdisciplinary STEAM units - Elementary - Math, Science, ELA',
          'resourceType': 'group',
          'profilePath': '/group/si/X1Y3TYev',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
        },
        {
          'id': 'g:si:71EyAXgv',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2F71%2FEy%2FAX%2Fgv%2F71EyAXgv%2Fprofilepictures%2F1423857630838%2Fmedium.jpg&expires=1424908800000&signature=a4c2964d9f42675532ca4435ba0e09b2a9746370',
          'displayName': 'Learning through the Environment - Elementary - Science',
          'resourceType': 'group',
          'profilePath': '/group/si/71EyAXgv',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
        },
        {
          'id': 'g:si:XyI377xw',
          'joinable': 'yes',
          'visibility': 'public',
          'tenantAlias': 'si',
          'thumbnailUrl': '/api/download/signed?uri=local%3Ag%2Fsi%2FXy%2FI3%2F77%2Fxw%2FXyI377xw%2Fprofilepictures%2F1423852272770%2Fmedium.jpg&expires=1424908800000&signature=49062210f1cebf815c5a4c50475cb01bc7dc5574',
          'displayName': 'Mechatronics',
          'resourceType': 'group',
          'profilePath': '/group/si/XyI377xw',
          'tenant': {
            'alias': 'si',
            'displayName': 'STEM Incubator'
          }
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
            if (typeof(queries[item[0]]) === 'undefined') {
                queries[item[0]] = [];
            }
            queries[item[0]].push(decodeURIComponent(item[1]));
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
        var ajaxStub = sinon.stub($, 'ajax').yieldsTo('success', oaeResponse);
        this.PrincipalsCollection = new Stem.Collections.Principals();
        this.PrincipalsCollection.fetch();
        ajaxStub.restore();
    });

    it('should generate the correct default URL to access the OAE', function() {
        parseURL(this.PrincipalsCollection.url())['protocol'].should.equal(Stem.config.oae.protocol);
        parseURL(this.PrincipalsCollection.url())['host'].should.equal(Stem.config.oae.host);
        parseURL(this.PrincipalsCollection.url())['pathname'].should.equal('/api/search/general');
        parseURL(this.PrincipalsCollection.url()).queries['resourceTypes'].should.include('group');
        parseURL(this.PrincipalsCollection.url()).queries['resourceTypes'].should.include('user');
        parseURL(this.PrincipalsCollection.url()).queries['scope'][0].should.equal('_tenant');
    });

    it('should include specified keywords in the request URL', function() {
        parseURL((new Stem.Collections.Principals([], {keywords: 'one two'})).url()).queries['q'][0].should.equal('one two');
    });

    it('should include specified size limit in the request URL', function() {
        parseURL((new Stem.Collections.Principals([], {limit: 5})).url()).queries['limit'][0].should.equal('5');
    });

    it('should parse the response from the OAE', function() {
        this.PrincipalsCollection.length.should.equal(8);
    });

    it('should create models from the OAE response', function() {
        this.PrincipalsCollection.at(0).get('description').should.equal(oaeResponse.results[0].description);
        this.PrincipalsCollection.at(1).get('description').should.equal(oaeResponse.results[1].description);
    });

    it('should identify all included subjects', function() {
        this.PrincipalsCollection.getTags().length.should.equal(3);
        this.PrincipalsCollection.getTags().should.include('Math');
        this.PrincipalsCollection.getTags().should.include('Science');
        this.PrincipalsCollection.getTags().should.include('ELA');
    });

    it('should return current options when requested', function() {
        this.PrincipalsCollection = new Stem.Collections.Principals([], {limit: 5});
        this.PrincipalsCollection.options().limit.should.equal(5);
    });

    it('should set options dynamically', function() {
        this.PrincipalsCollection.options({limit: 10});
        this.PrincipalsCollection.options().limit.should.equal(10);
    });

    it('should abort in-flight requests on new request', function() {
        var xhrStub = sinon.useFakeXMLHttpRequest();
        var xhrs = [];
        xhrStub.onCreate = function (xhr) { xhrs.push(xhr); };
        this.PrincipalsCollection.fetch();
        xhrs.length.should.equal(1);
        this.PrincipalsCollection.fetch();
        xhrs.length.should.equal(2);
        xhrs[0].aborted.should.be.true();
        xhrStub.restore();
    });

});
