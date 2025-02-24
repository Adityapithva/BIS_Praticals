function generateKeyMatrix(keyword) {
    let matrix = [], seen = new Set();
    keyword = (keyword + "ABCDEFGHIKLMNOPQRSTUVWXYZ").toUpperCase().replace(/J/g, 'I');
    
    for (let char of keyword) {
        if (!seen.has(char)) {
            seen.add(char);
            matrix.push(char);
        }
    }
    return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5));
}
function findPosition(matrix, letter) {
    for (let row = 0; row < 5; row++) {
        let col = matrix[row].indexOf(letter);
        if (col !== -1) return [row, col];
    }
    return null;
}

function processPairs(text) {
    text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let pairs = [];
    
    for (let i = 0; i < text.length; i += 2) {
        let a = text[i], b = text[i + 1] || 'X';
        if (a === b) b = 'X';
        pairs.push([a, b]);
    }

    return pairs;
}

function encryptPlayfair(text, keyword) {
    const matrix = generateKeyMatrix(keyword);
    const pairs = processPairs(text);
    let encryptedText = '';

    for (let [a, b] of pairs) {
        let [r1, c1] = findPosition(matrix, a);
        let [r2, c2] = findPosition(matrix, b);

        if (r1 === r2) {
            encryptedText += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) { 
            encryptedText += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
        } else { 
            encryptedText += matrix[r1][c2] + matrix[r2][c1];
        }
    }

    return encryptedText;
}
const keyword = "SECRET";
const plaintext = "HELLO";
const encrypted = encryptPlayfair(plaintext, keyword);

console.log("Keyword: ", keyword);
console.log("Plaintext: ", plaintext);
console.log("Encrypted: ", encrypted);
