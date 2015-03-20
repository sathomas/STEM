/*global beforeEach, describe, it, Stem  */

describe('PoiAsMarker View', function () {
    'use strict';

    beforeEach(function () {
        this.PoiModel = new Stem.Models.Poi({
            className: 'Class',
            imageUrl:  'http://image/url',
            link:      'http://link/url',
            title:     'Title'
        });
        this.PoiAsMarker = new Stem.Views.PoiAsMarker({
            model: this.PoiModel
        });
    });

    it('render method should return the view (for chaining)', function() {
        this.PoiAsMarker.render().should.equal(this.PoiAsMarker);
    });

    it('should include a link to the marker details', function() {
        var $el = this.PoiAsMarker.render().$el;
        $el.find('a').attr('href').should.equal(this.PoiModel.get('link'));
        $el.find('a').hasClass('poi-popup__link').should.be.true();
    });

    it('should include a link to the thumbnail image', function() {
        var $el = this.PoiAsMarker.render().$el;
        $el.find('a img').attr('src').should.equal(this.PoiModel.get('imageUrl'));
        $el.find('a img').hasClass('poi-popup__thumbnail').should.be.true();
    });

    it('should include the title', function() {
        var $el = this.PoiAsMarker.render().$el;
        $el.find('a span').text().trim().should.equal(this.PoiModel.get('title'));
        $el.find('a span').hasClass('poi-popup__text').should.be.true();
    });


});
