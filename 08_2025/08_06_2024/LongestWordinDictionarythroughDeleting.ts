/**
 *
 * We are given a string s and a list of words called dictionary, and we want to find the longest word in the dictionary that
 * can be formed by deleting some characters from s (i.e., the word must be a subsequence of s). If multiple such words exist,
 * we return the one that is lexicographically smallest. Instead of checking all possible deletions of s, we iterate over each
 * word in the dictionary and check whether it is a subsequence of s using a two-pointer technique. While checking, we keep track
 * of the current best candidate by comparing word lengths and lexicographic order.
 *
 */

function isSubsequence(word: string, s: string): boolean {
  let i = 0,
    j = 0;
  while (i < word.length && j < s.length) {
    if (word[i] === s[j]) i++;
    j++;
  }
  return i === word.length;
}

function findLongestWord(s: string, dictionary: string[]): string {
  let longest = "";

  for (const word of dictionary) {
    if (isSubsequence(word, s)) {
      if (
        word.length > longest.length ||
        (word.length === longest.length && word < longest)
      ) {
        longest = word;
      }
    }
  }

  return longest;
}

function main() {
  console.log(findLongestWord("abpcplea", ["ale", "apple", "monkey", "plea"]));
  console.log(findLongestWord("abpcplea", ["a", "b", "c"]));
  console.log(findLongestWord("bab", ["ba", "ab", "a", "b"]));
}

main();

/**
 *
 * Time complexity is O((n * L)
 * Space complexity is O(1)
 *
 */
