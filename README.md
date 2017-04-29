<img width="250px" src="http://zg.cognifide.com/galaxite/img/zg_logo.svg">
<br>

## Creative Exchange SDK
Zen Garden Creative Exchange SDK for Javascript

## SDK

```bash
$ npm install crex --save
```

Use with node.js or module bundler like Webpack

```js
var CrEx = require('crex');

var crex = new CrEx();

crex.exportGetAllPackages()
  .then((packages) => console.log(packages))
  .catch((err) => console.log(err))
```

Full docummentation and examples can be found here

## CLI

Package can also be installed globally as a CLI

```bash
$ npm install crex -g
```

### Exporting package

```bash
ce export /content/showcase/default/en_gb/home -x
```

### Importing package

```bash
ce import -c etc
```

Full documentation of available commands and options can be found here

## License 
MIT
