function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function modInverse(e, phi) {
    for (let d = 1; d < phi; d++) {
        if ((e * d) % phi === 1) return d;
    }
    return null;
}

function powerMod(base, exp, mod) {
    let result = 1;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return result;
}

function generateKeys() {
    const p = 61, q = 53;
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    
    let e = 3;
    while (gcd(e, phi) !== 1) e++;

    let d = modInverse(e, phi);
    return { publicKey: { e, n }, privateKey: { d, n } };
}

function encryptRSA(plainText, publicKey) {
    return plainText.split('').map(char => {
        let m = char.charCodeAt(0);
        return powerMod(m, publicKey.e, publicKey.n);
    });
}

function decryptRSA(cipherText, privateKey) {
    return cipherText.map(c => String.fromCharCode(powerMod(c, privateKey.d, privateKey.n))).join('');
}
const { publicKey, privateKey } = generateKeys();
const plaintext = "HELLO";
const encrypted = encryptRSA(plaintext, publicKey);
const decrypted = decryptRSA(encrypted, privateKey);

console.log("Plaintext: ", plaintext);
console.log("Encrypted: ", encrypted);
console.log("Decrypted: ", decrypted);
