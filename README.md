# STEM

Prototype for [Georgia K-12 STEM Incubator](http://sathomas.me/STEM/).

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

## Acknowledgements

The landing page image of a [Science Class](https://www.flickr.com/photos/pmorgan/3344693/in/photolist-i9g8-pdEX9G-9YZ89W-851WfX-4t3RvJ-4MP8xi-9deLWQ-pXEDu-e3aJLR-e3g85C-e3ashg-9dbEuz-9deM8U-9deL4C-aQ2pBk-aQ2puK-SZ8FB-akY8rV-5EeZ4b-8xG7Lt-5q7umX-8xK9MY-5rJw1X-7sKnDQ-phvDEF-e4QnqR-dnpd15-2GwHRT-AGrWX-auJkao-4oLYq9-6M1QKU-bzfwyk-bmkEjW-9qYJ9A-7KTK6p-8dmtTD-8dmu36-9bUc4s-4oM1Vb-bBsVxm-5NRQJo-b7CdWH-9dePBE-efcVbM-en6mLM-bzjYZs-4o8npj-nVZXB6-b2TrKg/) is copyright Peter Morgan, licensed under [Creative Commons](https://creativecommons.org/licenses/by-nc-nd/2.0/).

