/**
 *
 * We will collect all vowels from the string, sort them by ASCII value, and then rebuild the string by walking the original characters.
 * When we hit a consonant we keep it as-is, and when we hit a vowel we pop the next vowel from our sorted list to place there.
 * This preserves consonant positions while producing vowels in nondecreasing ASCII order.
 *
 */

function isVowel(ch: string): boolean {
  return ch.length === 1 && "aeiouAEIOU".includes(ch);
}

function sortVowels(s: string): string {
  if (s.length <= 1) return s;

  const chars = s.split("");
  const vowels: string[] = [];

  for (const ch of chars) {
    if (isVowel(ch)) vowels.push(ch);
  }

  vowels.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

  let vi = 0;
  const out: string[] = [];
  for (const ch of chars) {
    if (isVowel(ch)) {
      out.push(vowels[vi++]);
    } else {
      out.push(ch);
    }
  }

  return out.join("");
}

function main(): void {
  const tests: string[] = [
    "leetcode",
    "baA",
    "AEIOUuoiea",
    "rhythm",
    "",
    "A",
    "aA",
    "hElloWorld",
  ];

  for (const t of tests) {
    console.log(`input:  "${t}"`);
    console.log(`output: "${sortVowels(t)}"`);
    console.log("---");
  }
}

main();

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 *
 */
