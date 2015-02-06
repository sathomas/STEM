/*global Stem, $*/


window.Stem = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    config: {
        donorsChooseApiKey: 'DONORSCHOOSE'
    },
    init: function () {
        'use strict';
        // Stub/demo code for now
        var proposals = new Stem.Collections.Proposals([], {maxSize: 4});
        proposals.fetch({reset: true});
         var view = new Stem.Views.ProposalsAsHighlights({collection: proposals});
        view.render();
        $('#crowdfunding').append(view.el);

    }
};

$(document).ready(function () {
    'use strict';
    Stem.init();
});
