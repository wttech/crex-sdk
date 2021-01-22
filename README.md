# Creative Exchange SDK for JavaScript
<a href="https://www.npmjs.com/package/crex"><img src="https://img.shields.io/npm/v/crex.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/crex"><img src="https://img.shields.io/npm/l/crex.svg" alt="License"></a>

Creative Exchange SDK simplifies automation of Creative Exchange development workflow. 
It works both in Nodejs and in the browser, so it can be foundation for command line tools, electron apps, code editor plugins, browser monitoring tools and any other solutions that will make theme development easier for your organisation.

## SDK Quickstart

```bash
$ npm install crex --save
```

Use with Node or module bundler like Webpack

```js
var CrEx = require('crex');

var crex = new CrEx();
crex.getPackageList()
  .then((packages) => console.log(packages))
  .catch((err) => console.log(err));
```

## SDK Documentation 

Full documentation can be found here:
<https://mateuszluczak.github.io/crex-sdk>

## CLI

Package can also be installed globally as a CLI

```bash
$ npm install crex -g
```
```bash
$ ce --help
```
#### CLI Documentation

Full documentation can be found here:

1. For v1: [CrEx CLI Documentation v1](docs/crex-sdk-cli-v1.md)
2. For v2: [CrEx CLI Documentation v2](docs/crex-sdk-cli-v2.md)

## License 
MIT
