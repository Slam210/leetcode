/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set();
  visited.add(beginWord);

  while (queue.length > 0) {
    const [word, level] = queue.shift();

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const char = String.fromCharCode(c);
        if (char === word[i]) continue;

        const newWord = word.slice(0, i) + char + word.slice(i + 1);

        if (newWord === endWord) {
          return level + 1;
        }

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, level + 1]);
        }
      }
    }
  }

  return 0;
};

console.log(
  findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);
