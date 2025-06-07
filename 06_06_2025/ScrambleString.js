/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function (s1, s2) {
  const memo = new Map();

  function dfs(a, b) {
    const key = a + "#" + b;
    if (memo.has(key)) return memo.get(key);
    if (a == b) {
      memo.set(key, true);
      return true;
    }

    if (
      a.length !== b.length ||
      [...a].sort().join("") !== [...b].sort().join("")
    ) {
      memo.set(key, false);
    }

    for (let i = 1; i < a.length; i++) {
      if (dfs(a.slice(0, i), b.slice(0, i)) && dfs(a.slice(i), b.slice(i))) {
        memo.set(key, true);
        return true;
      }

      if (
        dfs(a.slice(0, i), b.slice(b.length - i)) &&
        dfs(a.slice(i), b.slice(0, b.length - i))
      ) {
        memo.set(key, true);
        return true;
      }
    }

    memo.set(key, false);
    return false;
  }

  return dfs(s1, s2);
};

console.log(isScramble("great", "rgeat"));
