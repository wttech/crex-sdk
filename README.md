![Cognifide logo](http://cognifide.github.io/images/cognifide-logo.png)

# Zen Garden Creative Exchange SDK for Javascript
<a href="https://www.npmjs.com/package/crex"><img src="https://img.shields.io/npm/v/crex.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/crex"><img src="https://img.shields.io/npm/l/crex.svg" alt="License"></a>

<br>
<p align="center">
    <img width="200px" alt="Zen Garden logo" src="http://zg4.cognifide.com/content/dam/4.0%20Release%20Notes/logo.svg">
</p>
<br>

Creative Exchange SDK simplifies automation of Zen Garden theme development workflow. 
It works both in Nodejs and in the browser, so it can be foundation for command line tools, electron apps, code editor plugins, browser monitoring tools and any other solutions that will make theme development easier for your organisation.

## SDK Quickstart

```bash
$ npm install crex --save
```

Use with Node or module bundler like Webpack

```js
var CrEx = require('crex');

var crex = new CrEx();
crex.exportGetAllPackages()
  .then((packages) => console.log(packages))
  .catch((err) => console.log(err));
```

## Documentation 

Full documentation can be found here:
<https://cognifide.github.io/crex-sdk>

## CLI

Package can also be installed globally as a CLI

```bash
$ npm install crex -g
```

#### Exporting package

```bash
$ ce export /content/showcase/default/en_gb/home -x
```

#### Importing package

```bash
$ ce import -c etc
```

## License 
MIT
