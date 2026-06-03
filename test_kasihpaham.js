const simulateWordle = (guessStr, secretStr) => {
    let result = Array(guessStr.length).fill('gray');
    let secretLetterCounts = {};
    for (let i = 0; i < secretStr.length; i++) {
        let char = secretStr[i];
        secretLetterCounts[char] = (secretLetterCounts[char] || 0) + 1;
    }
    for (let i = 0; i < guessStr.length; i++) {
        if (guessStr[i] === secretStr[i]) {
            result[i] = 'green';
            secretLetterCounts[guessStr[i]]--;
        }
    }
    for (let i = 0; i < guessStr.length; i++) {
        if (result[i] !== 'green' && secretLetterCounts[guessStr[i]] > 0) {
            result[i] = 'yellow';
            secretLetterCounts[guessStr[i]]--;
        }
    }
    return result;
};

const dictionary = ['BAHAR', 'BAMBU', 'KATAK', 'SAYAP', 'SALAH', 'TIDAK', 'BENAR'];

const kpPermutations = [
    { 'pink': 'green', 'blue': 'yellow', 'white': 'gray' },
    { 'pink': 'green', 'blue': 'gray', 'white': 'yellow' },
    { 'pink': 'yellow', 'blue': 'green', 'white': 'gray' },
    { 'pink': 'yellow', 'blue': 'gray', 'white': 'green' },
    { 'pink': 'gray', 'blue': 'green', 'white': 'yellow' },
    { 'pink': 'gray', 'blue': 'yellow', 'white': 'green' }
];

const testKasihPaham = (target, guesses) => {
    // Generate actual screen colors for guesses based on a fixed permutation
    const actualPerm = kpPermutations[0]; // Let's say pink=green, blue=yellow, white=gray
    const reversePerm = {'green': 'pink', 'yellow': 'blue', 'gray': 'white'};

    const activeGuesses = guesses.map(guessStr => {
        const realStatuses = simulateWordle(guessStr, target);
        const kpColors = realStatuses.map(status => reversePerm[status]);
        return { word: guessStr, kpColors: kpColors };
    });

    console.log(`Target: ${target}`);
    console.log(`Active Guesses:`, activeGuesses);

    let results = [];
    for (let candidateStr of dictionary) {
        let minPermError = Infinity;
        for (let perm of kpPermutations) {
            let currentPermError = 0;
            for (let guess of activeGuesses) {
                let realStatuses = simulateWordle(guess.word, candidateStr);
                for (let i = 0; i < guess.word.length; i++) {
                    let assumedStatus = perm[guess.kpColors[i]];
                    if (realStatuses[i] !== assumedStatus) {
                        currentPermError++;
                    }
                }
            }
            if (currentPermError < minPermError) minPermError = currentPermError;
        }
        results.push({ word: candidateStr, errorCount: minPermError });
    }

    results.sort((a, b) => a.errorCount - b.errorCount);
    console.log(`Solver Results:`, results);
};

testKasihPaham('BAHAR', ['BAMBU']);
testKasihPaham('BAHAR', ['BAMBU', 'SALAH']);
