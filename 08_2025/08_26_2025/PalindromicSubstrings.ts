/**
 *
 * We want to count all palindromic substrings in a string. Generating every substring and checking it would be slow, so instead we focus on
 * how palindromes form. Every palindrome can be expanded from a center, either around a single character or between two characters.
 * By expanding from each possible center and counting valid palindromes, we can efficiently capture all cases.
 *
 */

function expandAroundCenter(s: string, left: number, right: number): number {
  let count = 0;
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    count++;
    left--;
    right++;
  }
  return count;
}

function countSubstrings(s: string): number {
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    total += expandAroundCenter(s, i, i);
    total += expandAroundCenter(s, i, i + 1);
  }

  return total;
}

function main() {
  const s1 = "abc";
  const s2 = "aaa";
  const s3 = "abba";

  console.log(countSubstrings(s1));
  console.log(countSubstrings(s2));
  console.log(countSubstrings(s3));
}

main();

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(1)
 *
 */
