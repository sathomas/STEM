/*global jQuery */

/*!
 * jQuery plug-in to control a features component of the
 * Georgia K-12 STEM Incubator project.
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	'use strict';

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = 'featured',
				defaults = {};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
                    var $featured = $(this.element).hasClass('featured') ?
                        $(this.element) : $(this.element).find('.featured');
                    $featured.find('[data-featured-toggle]').on('click', function() {
                        var id = $(this).attr('data-featured-toggle');
                        if ($featured.attr('data-featured-selection') === '0') {
                            $featured.find('[data-featured-details="' + id + '"]').
                                each(function() {
                                    var height = $(this).outerHeight();
                                    $(this).css('height', 0).animate(
                                        { height: height }, 400, function() {
                                            $(this).css('height', 'auto');
                                        }
                                    );
                                }
                            );
                        }
                        $featured.attr('data-featured-selection', id);
                        return false;
                    });
                    $featured.find('[data-featured-close]').on('click', function() {
                        var id = $(this).parents('[data-featured-details]').
                            attr('data-featured-details');
                        $featured.find('[data-featured-details="' + id + '"]').animate(
                            { height: '0' }, 400, function() {
                                $(this).css('height', 'auto');
                                $featured.attr('data-featured-selection','0');
                            }
                        );
                        return false;
                    });

				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, 'plugin_' + pluginName ) ) {
								$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
						}
				});
		};

        // Automatically find any featured components already in the DOM.
        $('.featured').featured();

})( jQuery, window, document );
