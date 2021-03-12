const $ = require('jquery');
const crypto = require('crypto');
const AES_METHOD = 'aes-256-cbc';
const IV_LENGTH = 16; // For AES, this is always 16, checked with php
// const KEY = 'hlkwjeoerweioiweroiu434oi345k902'; // Must be 256 bytes (32 characters)


function encrypt(text, key) {
    if (process.versions.openssl <= '1.0.1f') {
        throw new Error('OpenSSL Version too old, vulnerability to Heartbleed')
    }

    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(AES_METHOD, new Buffer(key), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, key) {
    let textParts = text.split(':');
    let iv = new Buffer(textParts.shift(), 'hex');
    let encryptedText = new Buffer(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

function sendData(url_string_query, data_json, key, callback) {
    let requestLoginEnc = encrypt(JSON.stringify(data_json), key);
    $.post(BASE_URL + url_string_query, {
        data: requestLoginEnc
    }, function (r) {
        let resData = decrypt(r, key);
        ret = JSON.parse(resData);
        if (callback != null && $.isFunction(callback))
            callback(ret);
    });
}