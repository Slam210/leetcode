/**
 *
 * Bulls and Cows is a version of wordle, except with numbers.
 * Bulls are numbers guessed in the correct position.
 * Cows are numbers guessed in a different position.
 * To solve this problem, we can count bulls first, then non-bulls.
 * We track digit frequencies and compute cows based on overlapping values.
 *
 */

function getHint(secret: string, guess: string): string {
  let bulls = 0;
  let cows = 0;
  const secretMap: Record<string, number> = {};
  const guessMap: Record<string, number> = {};

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    } else {
      secretMap[secret[i]] = (secretMap[secret[i]] || 0) + 1;
      guessMap[guess[i]] = (guessMap[guess[i]] || 0) + 1;
    }
  }

  for (const digit in guessMap) {
    if (secretMap[digit]) {
      cows += Math.min(secretMap[digit], guessMap[digit]);
    }
  }

  return `${bulls}A${cows}B`;
}

console.log(getHint("1807", "7810"));

/**
 *
 * Run complexity is O(n)
 * Space complexity is O(1)
 *
 */
