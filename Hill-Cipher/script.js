function modInverse(a, m) {
    for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
    return null;
}

function hillEncrypt(plaintext) {
    const key = [[3, 3], [2, 5]]; 
    const mod = 26;
    
    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
    if (plaintext.length % 2 !== 0) plaintext += 'X';

    let result = '';
    for (let i = 0; i < plaintext.length; i += 2) {
        let a = plaintext.charCodeAt(i) - 65;
        let b = plaintext.charCodeAt(i + 1) - 65;
        
        let x = (key[0][0] * a + key[0][1] * b) % mod;
        let y = (key[1][0] * a + key[1][1] * b) % mod;

        result += String.fromCharCode(x + 65) + String.fromCharCode(y + 65);
    }
    return result;
}

function hillDecrypt(ciphertext) {
    const key = [[3, 3], [2, 5]];
    const mod = 26;
    
    let det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]) % mod;
    if (det < 0) det += mod;
    let detInv = modInverse(det, mod);
    if (!detInv) return "Key matrix not invertible";

    let invKey = [
        [key[1][1] * detInv % mod, -key[0][1] * detInv % mod],
        [-key[1][0] * detInv % mod, key[0][0] * detInv % mod]
    ].map(row => row.map(x => (x + mod) % mod));

    let result = '';
    for (let i = 0; i < ciphertext.length; i += 2) {
        let a = ciphertext.charCodeAt(i) - 65;
        let b = ciphertext.charCodeAt(i + 1) - 65;

        let x = (invKey[0][0] * a + invKey[0][1] * b) % mod;
        let y = (invKey[1][0] * a + invKey[1][1] * b) % mod;

        result += String.fromCharCode(x + 65) + String.fromCharCode(y + 65);
    }
    return result;
}
const plaintext = "HI";
const encrypted = hillEncrypt(plaintext);
const decrypted = hillDecrypt(encrypted);

console.log("Plaintext:", plaintext);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
