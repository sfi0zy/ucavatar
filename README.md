# Ucavatar.js
![version-badge](https://img.shields.io/npm/v/ucavatar.svg?style=flat-square&colorB=00b5d6) ![npm-downloads](https://img.shields.io/npm/dt/ucavatar.svg?style=flat-square&colorB=00b5d6) ![license-badge](https://img.shields.io/badge/dynamic/json.svg?style=flat-square&label=license&colorB=00b5d6&prefix=&suffix=&query=license&uri=https://raw.githubusercontent.com/sfi0zy/ucavatar/master/package.json)

Unique avatars for your users. No dependencies. 1.6KB gzipped.

![Preview of Ucavatar](https://raw.githubusercontent.com/sfi0zy/ucavatar/master/preview.png)

## Installation
From NPM
```sh
npm install --save ucavatar
```
```js
var Ucavatar = require('ucavatar');
```

Or you can copy it into your project and use a script tag
```html
<script src='ucavatar.js'></script>
```

Also you can use CDN:
```html
<script src='https://unpkg.com/ucavatar/ucavatar.js'></script>
```

## Examples
At first, you need a canvas:
```html
<canvas id='avatar'></canvas>
```
You can generate an avatar with the following code:
```js
Ucavatar('#avatar', 'name, nickname or email')
```
Or pass canvas itself:
```js
Ucavatar(document.querySelector('#avatar'), 'name')
```
By default size of an avatar is 64x64, but you can specify a custom one:
```js
Ucavatar('#avatar', 'name', 128)
```

## Enjoy it!
