/**
 *
 * We need to check whether s2 contains a substring with exactly the same character composition as s1. Instead of
 * explicitly generating permutations, we track character frequencies. We compare the frequency count of s1 with
 * the counts in each fixed-size sliding window of s2. By moving the window one character at a time and updating
 * counts in constant time, we efficiently detect whether a matching composition exists.
 *
 */

function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  let count1 = new Array(26).fill(0);
  let count2 = new Array(26).fill(0);

  for (let i = 0; i < s1.length; i++) {
    count1[s1.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i) - 97]++;
  }

  function matches(a: number[], b: number[]): boolean {
    for (let i = 0; i < 26; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  if (matches(count1, count2)) return true;

  for (let i = s1.length; i < s2.length; i++) {
    count2[s2.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i - s1.length) - 97]--;
    if (matches(count1, count2)) return true;
  }

  return false;
}

function main() {
  console.log(checkInclusion("ab", "eidbaooo"));
  console.log(checkInclusion("ab", "eidboaoo"));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
