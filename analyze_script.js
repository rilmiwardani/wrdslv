const fs = require('fs');
const content = fs.readFileSync('C:/Users/THANIA - BAIHAKKI/.gemini/antigravity/brain/71e31dec-bc91-4250-aac7-4e4e12fe01db/.system_generated/steps/12/content.md', 'utf8');

const regex = /"([a-z]{5})"/g;
let match;
let words = new Set();
while ((match = regex.exec(content)) !== null) {
  words.add(match[1]);
}
console.log('Found ' + words.size + ' unique 5-letter words in quotes.');
// console.log(Array.from(words).slice(0, 50).join(', '));
