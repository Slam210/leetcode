/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const m = s.length,
    n = t.length;
  const memo = new Map();

  function dfs(i, j) {
    if (j === n) return 1;
    if (i === m) return 0;

    const key = i + "," + j;
    if (memo.has(key)) return memo.get(key);

    let result = 0;

    if (s[i] === t[j]) {
      result = dfs(i + 1, j + 1) + dfs(i + 1, j);
    } else {
      result = dfs(i + 1, j);
    }

    memo.set(key, result);
    return result;
  }

  return dfs(0, 0);
};

console.log(numDistinct("rabbbit", "rabbit"));
