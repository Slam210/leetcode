/**
 *
 * We need a dictionary that finds words by both prefix and suffix efficiently.
 * To do this, we preprocess every word by generating all prefix–suffix pairs
 * and store them in a map where each key is "prefix#suffix" and the value is
 * the word’s index. Since later words overwrite earlier ones, the map always
 * stores the largest index for each pair. This preprocessing lets us answer
 * each query in constant time by simply checking the map for the given prefix
 * and suffix combination.
 *
 */

export default class WordFilter {
  private map: Map<string, number>;

  constructor(words: string[]) {
    this.map = new Map();

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let p = 1; p <= word.length; p++) {
        const prefix = word.substring(0, p);
        for (let s = 0; s <= word.length; s++) {
          const suffix = word.substring(word.length - s);
          this.map.set(prefix + "#" + suffix, i);
        }
      }
    }
  }

  f(pref: string, suff: string): number {
    const key = pref + "#" + suff;
    return this.map.has(key) ? this.map.get(key)! : -1;
  }
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */

function main() {
  const wf = new WordFilter(["apple", "apply", "ape"]);
  console.log(wf.f("ap", "e"));
  console.log(wf.f("ap", "le"));
  console.log(wf.f("ap", "ly"));
  console.log(wf.f("a", "x"));
}

main();

/**
 *
 * Time complexity for construction is O(N * L^2) while lookup is O(1)
 * Space complexity is O(N * L^2)
 *
 */
