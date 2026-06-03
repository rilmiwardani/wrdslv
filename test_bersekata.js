const A = (a, b) => a === b;

function bersekataSimulate(e, a) { // e = target, a = guess
  const t = Array(a.length).fill("gray"), n = {};
  
  for(let s = 0; s < a.length; s++) {
    const t = a[s];
    let r = !1;
    for(let a = 0; a < e.length; a++) {
      if(A(t, e[a])) {
        n[t] = (n[t] || 0) + 1;
        r = !0;
        break;
      }
    }
    r || (n[t] = n[t] || 0);
  }
  
  for(let s = 0; s < a.length; s++) {
    if (A(e[s], a[s])) {
      t[s] = "green";
      n[a[s]]--;
    }
  }
  
  for(let s = 0; s < a.length; s++) {
    if("gray" === t[s]) {
      for(const key in n) {
        if(A(e[s], key) && n[key] > 0) {
          t[s] = "yellow";
          n[key]--;
          break;
        }
      }
    }
  }
  
  return t;
}

const target = "ABCDE";
const guess = "FGBHI";
console.log(`Target: ${target}, Guess: ${guess}`);
console.log(`Bersekata Result:`, bersekataSimulate(target, guess));

// Wait, the user said kasihpaham_solver.html is correct.
// Let's test kasihpaham_solver.html's evaluateGuess
function kasihPahamSolverSimulate(target, guess) {
  const result = Array(guess.length).fill('gray');
  const counts = {};

  for (let i = 0; i < guess.length; i++) {
    const ch = guess[i];
    let found = false;
    for (let j = 0; j < target.length; j++) {
      if (ch === target[j]) {
        counts[ch] = (counts[ch] || 0) + 1;
        found = true;
        break;
      }
    }
    if (!found) counts[ch] = counts[ch] || 0;
  }

  for (let i = 0; i < guess.length; i++) {
    if (target[i] === guess[i]) {
      result[i] = 'green';
      counts[guess[i]]--;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'gray') {
      for (const ch in counts) {
        if (target[i] === ch && counts[ch] > 0) {
          result[i] = 'yellow';
          counts[ch]--;
          break;
        }
      }
    }
  }

  return result;
}

console.log(`kasihpaham_solver Result:`, kasihPahamSolverSimulate(target, guess));
