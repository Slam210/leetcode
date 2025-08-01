/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return [];

  const result = [];
  const graph = new Map();
  const level = new Map();

  const queue = [beginWord];
  level.set(beginWord, 0);

  while (queue.length > 0) {
    const nextQueue = [];
    for (let word of queue) {
      const wordArray = word.split("");
      for (let i = 0; i < wordArray.length; i++) {
        const originalChar = wordArray[i];
        for (let c = 97; c <= 122; c++) {
          const newChar = String.fromCharCode(c);
          if (newChar === originalChar) continue;
          wordArray[i] = newChar;
          const newWord = wordArray.join("");
          if (wordSet.has(newWord)) {
            if (!level.has(newWord)) {
              level.set(newWord, level.get(word) + 1);
              nextQueue.push(newWord);
              graph.set(newWord, [word]);
            } else if (level.get(newWord) === level.get(word) + 1) {
              graph.get(newWord).push(word);
            }
          }
        }
        wordArray[i] = originalChar;
      }
    }
    if (level.has(endWord)) break;
    queue.splice(0, queue.length, ...nextQueue);
  }

  if (!level.has(endWord)) return [];

  const path = [endWord];
  const dfs = (word) => {
    if (word === beginWord) {
      result.push([...path].reverse());
      return;
    }
    for (const parent of graph.get(word) || []) {
      path.push(parent);
      dfs(parent);
      path.pop();
    }
  };

  dfs(endWord);
  return result;
};

console.log(
  findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);
