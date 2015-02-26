# STEM

Prototype for [Georgia K-12 STEM Incubator](http://demo.stemincubator.org/).

## Status: [![Build Status](https://travis-ci.org/sathomas/test.png)](https://travis-ci.org/sathomas/STEM)

Any update to this repository triggers an automated execution of all of the project’s unit tests. The status label above shows the result of those unit tests.

## Building

1. Install [node.js](http://nodejs.org) directly from its web site or via a package manager such as [Homebrew](http://brew.sh).
2. Install `grunt-cli` and `bower` globally, e.g. `npm install -g grunt-cli bower`.
3. Clone this repository and `cd` into the the cloned folder.
4. Install all the build tools `npm install`.
5. Install the code dependencies `bower install`.
6. Install the test dependencies `pushd test; bower install; popd`
7. Build the release `grunt build`

The completed build will be available in the `dist` folder.

