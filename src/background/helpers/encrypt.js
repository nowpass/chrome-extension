import aesjs from 'aes-js'
import sha256 from 'js-sha256'

/**
 * Encrypt the given string with AES CBC 256 bit and the passphrase and base64 (for storing) encodes it
 * @param clearText {string}
 * @param passphrase {string}
 * @returns {string}
 */
export default function (clearText, passphrase) {
    let bs = 32;
    let hash = sha256.create();

    // We need the digest
    let key = hash.update(passphrase).digest();

    let clearBytes = aesjs.utils.utf8.toBytes(clearText);

    // We need a min length
    let fillCount = (bs - clearBytes.length % bs);
    let char = String.fromCharCode(fillCount);

    // Pad it to up
    for (let i = 0; i < fillCount; i++) {
        clearText += char;
    }

    clearBytes = aesjs.utils.utf8.toBytes(clearText);

    let crypto = window.crypto || window.msCrypto; // for IE 11
    let iv = new Uint8Array(16);

    // Get a set of random numbers (0-255)
    crypto.getRandomValues(iv);

    let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    let cryptedBytes = aesCbc.encrypt(clearBytes);

    // Add the IV in the beginning (our salt)
    let withIv = new Uint8Array(iv.length + cryptedBytes.length);
    withIv.set(iv);
    withIv.set(cryptedBytes, iv.length);

    return new Buffer(withIv).toString('base64');
}
