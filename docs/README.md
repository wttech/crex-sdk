# Creative Exchange SDK Documentation

Creative Exchange SDK simplifies automation of Zen Garden theme development workflow.
It works both in Nodejs and in the browser, so it can be foundation for command line tools,
electron apps, code editor plugins, browser monitoring tools and any other solutions that will
make theme development easier for your organisation.

## Installation

#### Npm

Use npm for Nodejs, Webpack, Rollup

```bash
$ npm install crex --save
```

#### Script tag

Umd package is available on unpkg:

```html
<script src="https://unpkg.com/crex/dist/crex-sdk.min.js"></script>
```

Loading library will expose ``window.CrEx``

## Usage

Browser with ``script``

```html
<script src="https://unpkg.com/crex/dist/crex-sdk.min.js"></script>
<script>
var crex = new CrEx(); //Defaults to local instance
crex.exportGetAllPackages()
  .then((packages) => console.log(packages))
  .catch((err) => console.log(err));
</script>
```

Nodejs, Webpack, Rollup

```js
const CrEx = require('crex');
const crex = new CrEx(); //Defaults to local instance
crex.exportGetAllPackages()
  .then((packages) => console.log(packages))
  .catch((err) => console.log(err));
```

## General documentation

#### Endpoints
For documentation of all endpoints, parameters they receive and data they return see [CrEx class definition](https://mateuszluczak.github.io/crex-sdk/CrEx.html). Methods are available directly from an instance of API class eg. ``crex.exportGetAllPackages()``

#### Promises
The SDK uses native Promise implementation. For using non-supporting browser polyfill is required.