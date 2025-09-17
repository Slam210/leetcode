/**
 *
 * We want the longest word in the dictionary that can be built character by character, where each smaller prefix is
 * also in the dictionary. To solve this efficiently, we can store words in a set for fast lookup and then iterate
 * through them in lexicographical order. By ensuring that a word is only considered valid if its prefix exists, we
 * can gradually build longer words from shorter ones. During iteration, we keep track of the longest valid word so
 * far, updating it when we find a longer candidate or one with smaller lexicographical order if lengths match.
 *
 */

function longestWord(words: string[]): string {
  words.sort();
  let built = new Set<string>();
  let res = "";

  for (let word of words) {
    if (word.length === 1 || built.has(word.slice(0, -1))) {
      built.add(word);
      if (word.length > res.length) {
        res = word;
      }
    }
  }

  return res;
}

function main() {
  const words = ["w", "wo", "wor", "worl", "world"];
  console.log(longestWord(words));
}

main();

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 *
 */
