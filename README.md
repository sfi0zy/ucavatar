# Ucavatar.js
Ucavatar is a little standalone library for generating unique avatars.

![Preview of Ucavatar](https://raw.githubusercontent.com/sfi0zy/ucavatar/master/preview.png)

## Installation
From NPM
```sh
npm install --save ucavatar
```
```js
var Ucavatar = require('ucavatar');
```

Or You can copy it into your project and use a script tag
```html
<script src='ucavatar.js'></script>
```

## Examples
At first, You need a canvas:
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
By default size of an avatar is 64x64, but You can specify a custom one:
```js
Ucavatar('#avatar', 'name', 128)
```

## Enjoy it!
Ucavatar is based on my pen [Unique Avatars Generator (prototype)](http://codepen.io/sfi0zy/pen/kkBAjd), it is a beta version and I have not very much time to work on it. If you have an idea how to improve Ucavatar - You can fork it, make changes and create a pull request, or contact me by email (sfi0zy@gmail.com).

