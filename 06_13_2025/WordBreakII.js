/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Map();

  function dfs(start) {
    if (memo.has(start)) return memo.get(start);
    if (start === s.length) return [""];

    const sentences = [];

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);
      if (wordSet.has(word)) {
        const suffixes = dfs(end);
        for (const suffix of suffixes) {
          const sentence = word + (suffix ? " " + suffix : "");
          sentences.push(sentence);
        }
      }
    }

    memo.set(start, sentences);
    return sentences;
  }

  return dfs(0);
};
