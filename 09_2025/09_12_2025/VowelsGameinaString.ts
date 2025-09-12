/**
 *
 * We observe that Alice only loses when the string contains no vowels because she has no legal moves.
 * If there is at least one vowel, we can force a win: when the total vowel count is odd we remove the
 * whole string and win immediately. When it is even we remove any substring with an odd number of vowels,
 * which makes the remaining vowel count odd. Bob's moves only remove an even number of vowels, so the
 * remaining vowel count stays odd and on our next turn we remove the whole remainder and win. Therefore
 * the presence of at least one vowel is both necessary and sufficient for Alice to have a winning strategy.
 *
 */

export default function doesAliceWin(s: string): boolean {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  for (const ch of s) {
    if (vowels.has(ch)) {
      return true;
    }
  }
  return false;
}

function main(): void {
  const tests = [
    "",
    "b",
    "a",
    "ab",
    "bcdfg",
    "xiy",
    "VVV",
    "bbcccdd",
    "consonantVowel",
  ];

  for (const t of tests) {
    console.log(`${JSON.stringify(t)} -> ${doesAliceWin(t)}`);
  }
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
