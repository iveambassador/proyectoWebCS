const MD5 = require('crypto-js/md5');
const SHA1 = require('crypto-js/sha1');
const SHA256 = require('crypto-js/sha256');
const HmacSHA1 = require('crypto-js/hmac-sha1');
const HmacSHA256 = require('crypto-js/hmac-sha256');

const CryptoJS = require('crypto-js');

// Uso 1: se introduce y utiliza un solo algoritmo
let message = 'Heng y Mo H jaja 1234343434';
let key = 'hengyumo@1234';

console.log('md5: ' + MD5(message));
console.log('sha1: ' + SHA1(message));
console.log('sha256: ' + SHA256(message));
console.log('hmac-sha1: ' + HmacSHA1(message, key));
console.log('hmac-sha256: ' + HmacSHA256(message, key));


// Uso 2: Todo el uso, debido a que aes contiene cifrado y descifrado, hay dos métodos, no puede usar AES directamente para cifrar
let result = CryptoJS.AES.encrypt(message, key);
console.log('aes encrypt: ' + result);
// ¡Lo que obtiene aes después del descifrado son bytes, que deben convertirse en cadenas! ! !
console.log('aes decrypt: ' + CryptoJS.AES.decrypt(result, key).toString(CryptoJS.enc.Utf8));

result = CryptoJS.DES.encrypt(message, key);
console.log('des encrypt: ' + result);
console.log('des decrypt: ' + CryptoJS.DES.decrypt(result, key).toString(CryptoJS.enc.Utf8));

// El cifrado hash puede ser directamente CryptoJS.HmacSHA512 (mensaje, clave)
console.log('hmac-sha256: ' + CryptoJS.HmacSHA512(message, key));
console.log('sha512: ' + CryptoJS.SHA512(message));


// Uso 3: Base64, codificación hexadecimal hexadecimal para convertir el resultado del cifrado
let base64Result = CryptoJS.enc.Base64.stringify(CryptoJS.DES.decrypt(result, key));
console.log(base64Result);
let hexResult = CryptoJS.enc.Hex.stringify(CryptoJS.DES.decrypt(result, key));
console.log(hexResult);



