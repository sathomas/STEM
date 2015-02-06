/*global beforeEach, describe, it, Stem  */

describe('ProposalAsHighlight View', function () {
    'use strict';

    beforeEach(function () {
        this.Proposal = new Stem.Models.Proposal({
            'id':                '1',
            'title':             'Title',
            'imageURL':          'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png',
            'shortDescription':  'Short Description',
            'fulfillmentTrailer': 'Trailer',
            'schoolName':        'School Name',
            'city':              'City',
            'proposalURL':       'http://www.gatech.edu',
            'povertyLevel':      '',
            'totalPrice':        '100',
            'costToComplete':    '1'
        });
        this.ProposalAsHighlightView = new Stem.Views.ProposalAsHighlight({model: this.Proposal});
    });

    it('render method should return the view (for chaining)', function() {
        this.ProposalAsHighlightView.render().should.equal(this.ProposalAsHighlightView);
    });

    it('should render the title as an <h4> header', function() {
        var $el = this.ProposalAsHighlightView.render().$el;
        $el.find('h4').text().should.equal(this.Proposal.get('title'));
    });

    it('should render the thumbnail as an <img> image', function() {
        var $el = this.ProposalAsHighlightView.render().$el;
        $el.find('img').attr('src').should.equal(this.Proposal.get('imageURL'));
    });

    it('should render the description as the first paragraph', function() {
        var $el = this.ProposalAsHighlightView.render().$el;
        $el.find('p').first().text().should.equal(this.Proposal.get('shortDescription'));
    })

});
