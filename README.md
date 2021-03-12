# What Is This?

Encrypt and Decryp data from javascript to php or vice versa.

# Installatain

`npm i kaatenize --save`

```
import { sendData } from kaatenize;

var key = 'abcdefghijklmnopqrstuv0123456789';
var contohData = {
    test : "Hanya test message",
};

sendData("http://localhost:8000/receivedata", contohData, key, function (return) {
	console.log(return);
});
```
