function railFenceEncrypt(text, rails) {
    let rail = Array.from({ length: rails }, () => []);
    let row = 0, direction = 1;

    for (let char of text.toUpperCase().replace(/[^A-Z]/g, '')) {
        rail[row].push(char);
        row += direction;
        if (row === 0 || row === rails - 1) direction *= -1;
    }

    return rail.flat().join('');
}

const plaintext = "HELLO WORLD";
const rails = 3;
const encrypted = railFenceEncrypt(plaintext, rails);

console.log("Plaintext: ", plaintext);
console.log("Encrypted: ", encrypted);
