/**
 *
 * We want to efficiently determine whether a search word can match a dictionary word with exactly one character
 * modification. To do this, we first organize dictionary words by their lengths. Then, during a search, we skip
 * unnecessary comparisons by only checking words of the same length. For each word, we check how many characters
 * differ. If it’s exactly one, we return true. Otherwise, after checking all candidates, we return false. This
 * keeps the design simple, direct, and efficient enough for the problem constraints.
 *
 */

class MagicDictionary {
  private dict: Map<number, string[]>;

  constructor() {
    this.dict = new Map();
  }

  buildDict(dictionary: string[]): void {
    for (const word of dictionary) {
      const len = word.length;
      if (!this.dict.has(len)) {
        this.dict.set(len, []);
      }
      this.dict.get(len)!.push(word);
    }
  }

  search(searchWord: string): boolean {
    const len = searchWord.length;
    if (!this.dict.has(len)) return false;

    for (const word of this.dict.get(len)!) {
      let diff = 0;
      for (let i = 0; i < len; i++) {
        if (word[i] !== searchWord[i]) diff++;
        if (diff > 1) break;
      }
      if (diff === 1) return true;
    }

    return false;
  }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */

function main() {
  const obj = new MagicDictionary();
  obj.buildDict(["hello", "leetcode"]);
  console.log(obj.search("hello"));
  console.log(obj.search("hhllo"));
  console.log(obj.search("hell"));
  console.log(obj.search("leetcoded"));
}

main();

/**
 *
 * Time complexity is  O(n)
 * Space complexity is O(n)
 *
 */
