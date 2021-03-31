# What Is This?

Encrypt and Decryp data from javascript to php or vice versa.

# Installation

`npm i kaatenize --save`

```
var kaatenize = require("kaatenize");
const $ = require('jquery');
var enkripsi = new kaatenize();
var key = 'asdflkjasdflkjasdflkjasdflkjasdf';
var text = "cuma mo coba";
var data = enkripsi.encrypt(text, key);
console.log(data)
var dataTranslate = enkripsi.decrypt(data, key);
console.log(dataTranslate)
```
