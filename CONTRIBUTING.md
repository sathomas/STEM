## Contributing

In it’s current early state, this project is very much a work in progress, but here’s a quick outline of the development process.

### HTML

As a single-page application, this project has very little static HTML, and it’s all contained in the single `app/index.html` file. Most of the markup is actually located in EJS templates in the `app/scripts/templates` folder. Those files use standard [Underscore.js](http://underscorejs.org) [templating](http://underscorejs.org/#template). The static HTML content is designed to provide (minimal) usability of the site for non-JavaScript browsers.

### CSS

The site relies on [LESS](http://lesscss.org) to build its (single) stylesheet. Styles generally follow to the [Block, Element, Modifier](https://en.bem.info) approach. Style definitions are linted using [CSS Lint](http://csslint.net).

### JavaScript

The application relies on the standard boilerplates created by [Yeoman](http://yeoman.io), specifically the [Backbone generator](https://github.com/yeoman/generator-backbone). In general, models are singular nouns (e.g. `Proposal`), collections are plural (e.g. `Proposals`), and views include the model or collection and a description of how it is rendered (e.g. `ProposalAsHighlight`). The project strives very hard to provide unit tests for all code. JavaScript is also linted using [JSHint](http://jshint.com).

### Documentation

Development documentation is automatically generated and updated during the development process. Documentation within the CSS code builds a live [style guide](http://sathomas.me/STEM/docs/styleguide/) using [styledown](https://github.com/styledown/styledown). Much of the code is documented using [literate programming](http://en.wikipedia.org/wiki/Literate_programming). We use [docco](http://jashkenas.github.io/docco/) to automatically generate [annotated documentation](http://sathomas.me/STEM/docs/js/).

### Useful Commands

Here’s a quick list of some useful command line functions for the development.

* `yo backbone:model modelName`: create a new Backbone model with boilerplate and include it in the app. The same idea works for collections and views as well. Note that there is a bug in the current Yeoman generator: it does not add newly created models, collections, views, etc. to the test scaffolding correctly. You have to edit the `test/index.html` file and explicitly add the model/view/etc. to the app code, and insert a `.spec` in the file name for the test code.
* `grunt lint`: runs CSS Lint and JSHint on the codebase.
* `grunt test`: runs the unit test suite in a command line mode (pass or fail result).
* `grunt build`: builds the production version
* `grunt serve`: runs a development server with live reload.
* `grunt serve:test`: runs a browser-based unit test suite.
* `grunt serve:dist`: builds the production version and runs a local server.
* `grunt docs`: generates the development documentation.
