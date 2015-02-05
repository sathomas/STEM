/*global beforeEach, describe, it, $  */
'use strict';

describe('ProposalAsHighlight View', function () {

    beforeEach(function () {
        this.Proposal = new Stem.Models.Proposal({
            'id':               '1',
            'title':            'Title',
            'thumbImageURL':    'http://www.gatech.edu/sites/all/themes/gt/images/logos/logo-gt.png',
            'shortDescription': 'Short Description',
            'schoolName':       'School Name',
            'city':             'City'
        });
        this.ProposalAsHighlightView = new Stem.Views.ProposalAsHighlight({model: this.Proposal});
    });

    it('render method should return the view (for chaining)', function() {
        this.ProposalAsHighlightView.render().should.equal(this.ProposalAsHighlightView);
    })

    it('should render the title as an <h3> header', function() {
        var $el = this.ProposalAsHighlightView.render().$el;
        $el.find('h3').text().should.equal(this.Proposal.get('title'));
    })

    it('should render the thumbnail as an <img> image', function() {
        var $el = this.ProposalAsHighlightView.render().$el;
        $el.find('img').attr('src').should.equal(this.Proposal.get('thumbImageURL'));
    })

    it('should render the description as the first paragraph', function() {
        var $el = this.ProposalAsHighlightView.render().$el;
        $el.find('p').first().text().should.equal(this.Proposal.get('shortDescription'));
    })

});
