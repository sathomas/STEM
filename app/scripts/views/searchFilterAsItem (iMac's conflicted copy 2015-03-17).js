/*global Stem, Backbone, JST*/

// Basic Backbone view that renders
// a search filter as a list item.

Stem.Views = Stem.Views || {};

(function () {
    'use strict';

    Stem.Views.SearchFilterAsItem = Backbone.View.extend({

        template: JST['app/scripts/templates/searchFilterAsItem.ejs'],

        tagName: 'li',

        className: 'results-filter__list-item',

        events: {
            'change input': 'change',
            'click input': 'change'
        },

        // Default values for options.

        defaults: {
            groupId: '' // unique ID for group of filters
        },

        initialize: function (options) {

            // Save any options passed to constructor.

            this.options = _.extend({}, this.defaults, options);

            return this;  // for method chaining

        },

        render: function () {

            // First render this model's view as the parent view.

            this.$el.html(this.template(
                _.extend(
                    {},
                    this.model.toJSON(),
                    { groupId: this.options.groupId, id: _.uniqueId() }
                )
            ));

            // Now add the tag set as a child view.

            if (this.model.get('tagSet')) {

                var tagsetView = new Stem.Views.TagSetAsCheckboxGroup({
                    model: this.model.get('tagSet')
                }).render();

                this.$el.find('.results-filter__list-item__content')
                    .append(tagsetView.$el);

            }

            return this; // for method chaining

        },

        // If the user changes a selection value, we
        // update the underlying model.

        change: function() {

            // Get the current selected state.

            var selected = this.$el.find('input').is(':checked');

            // Update the model with the current state of
            // the selection.

            this.model.set('selected', selected);

        },

    });

})();
