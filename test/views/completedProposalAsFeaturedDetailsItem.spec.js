/*global beforeEach, describe, it, Stem  */

describe('CompletedProposalAsFeaturedDetailsItem View', function () {
    'use strict';

    beforeEach(function () {
        this.Proposal = new Stem.Models.Proposal({
            'id':                '1',
            'title':             'Title',
            'thumbImageURL':     'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png',
            'imageURL':          'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png',
            'shortDescription':  'Short Description',
            'fulfillmentTrailer': 'Trailer',
            'schoolName':        'School Name',
            'city':              'City',
            'proposalURL':       'http://www.gatech.edu',
            'povertyLevel':      '',
            'totalPrice':        '100.23',
            'costToComplete':    '1'
        });
        this.CompletedProposalAsFeaturedDetailsItem = new Stem.Views.CompletedProposalAsFeaturedDetailsItem({model: this.Proposal});
    });

    it('render method should return the view (for chaining)', function() {
        this.CompletedProposalAsFeaturedDetailsItem.render().should.equal(this.CompletedProposalAsFeaturedDetailsItem);
    });

    it('should render the thumbnail as an <img>', function() {
        var $el = this.CompletedProposalAsFeaturedDetailsItem.render().$el;
        $el.find('img').attr('src').should.equal(this.Proposal.get('thumbImageURL'));
    });

    it('should render the title as an <h4> header with appropriate styling class', function() {
        var $el = this.CompletedProposalAsFeaturedDetailsItem.render().$el;
        $el.find('h4').text().should.equal(this.Proposal.get('title'));
        $el.find('h4').hasClass('featured__details__title').should.be.true();
    });

    it('should render the description as the first paragraph', function() {
        var $el = this.CompletedProposalAsFeaturedDetailsItem.render().$el;
        $el.find('p').first().text().should.equal(this.Proposal.get('shortDescription'));
    });

    it('should include a link to the project with appropriate styling classes', function() {
        var $el = this.CompletedProposalAsFeaturedDetailsItem.render().$el;
        $el.find('a').attr('href').should.equal(this.Proposal.get('proposalURL'));
        $el.find('a').hasClass('button button--link').should.be.true();
    });

    it('should include rouned total price in link text', function() {
        var $el = this.CompletedProposalAsFeaturedDetailsItem.render().$el;
        $el.find('a').text().should.have.string('$' + Math.round(+this.Proposal.get('totalPrice')) + ' ');
    });
});
