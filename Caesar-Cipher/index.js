function caesarCipher(str, shift) {
    return str
        .split('')
        .map(char => shiftChar(char, shift))
        .join('');
}

function shiftChar(char, shift) {
    const isUpperCase = char >= 'A' && char <= 'Z';
    const isLowerCase = char >= 'a' && char <= 'z';

    if (isUpperCase || isLowerCase) {
        const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
    }
    return char; 
}

function caesarDecipher(str, shift) {
    return caesarCipher(str, -shift);
}

const plainText = "Hello, World!";
const shift = 3;
const encryptedText = caesarCipher(plainText, shift);
const decryptedText = caesarDecipher(encryptedText, shift);

console.log("Plain Text: ", plainText);
console.log("Encrypted Text: ", encryptedText);
console.log("Decrypted Text: ", decryptedText);
