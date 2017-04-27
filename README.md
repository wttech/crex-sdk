<img width="200px" src="http://zg.cognifide.com/galaxite/img/zg_logo.svg">

## Creative Exchange SDK
Zen Garden Creative Exchange SDK for Javascript

## Usage

```bash
$ npm install crex --save
```

Use with node.js or module bundler like Webpack
```js
var CrEx = require('crex');

var crex = new CrEx({
	user: 'admin',
	password: 'admin',
	address: 'localhost',
	port: 4502
});

crex.exportGetAllPackages()
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```