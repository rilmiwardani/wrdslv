const fs = require('fs');
const c = fs.readFileSync('C:/Users/THANIA - BAIHAKKI/.gemini/antigravity/brain/eb6803c3-cf33-4220-a781-e863eda3f08a/.system_generated/steps/264/content.md', 'utf8');

// Now let's find `d` variable - it controls easy mode (d ? t[a] : ne[t[a]])
// If d is true => show raw color (green/yellow/gray) - EASY MODE
// If d is false => show mapped color via ne[t[a]] (colorMap) - KASIH PAHAM mode

// Let's find the reset handler which shows how colorMap is shuffled
const ueIdx = c.indexOf('ue=()=>{');
console.log('=== Reset/New game handler (ue) ===');
if (ueIdx >= 0) console.log(c.substring(ueIdx, ueIdx + 1000));

// Find the colorMap/ne state initialization
const seIdx = c.indexOf('se(a.colorMap)');
console.log('\n=== colorMap state init ===');
if (seIdx >= 0) console.log(c.substring(Math.max(0, seIdx-400), seIdx + 200));

// Key question: What are the visual colors? "pink", "blue", "white" 
// Let's find the te array
const teIdx = c.indexOf('["pink","blue","white"]');
if (teIdx < 0) {
    // Try other orders
    for (let arr of ['["blue","pink","white"]', '["white","pink","blue"]', '[te[0],te[1],te[2]]', 'const te=']) {
        const idx = c.indexOf(arr);
        if (idx >= 0) {
            console.log(`\n=== Found ${arr} at ${idx} ===`);
            console.log(c.substring(Math.max(0, idx-300), idx + 500));
        }
    }
}

// Find the colorMap default
const cmDefault = c.indexOf('colorMap:{');
if (cmDefault >= 0) {
    console.log('\n=== colorMap default ===');
    console.log(c.substring(cmDefault, cmDefault + 200));
}

// CRITICAL: When is colorMap shuffled? Every round start or every guess?
const sortRandom = c.indexOf('sort(()=>Math.random()-.5)');
if (sortRandom >= 0) {
    console.log('\n=== Shuffle logic ===');
    console.log(c.substring(Math.max(0, sortRandom - 400), sortRandom + 400));
}
