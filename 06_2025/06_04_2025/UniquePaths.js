/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let N = m + n - 2;
  let k = Math.min(m - 1, n - 1);

  let res = 1;
  for (let i = 1; i <= k; i++) {
    res = (res * (N - k + i)) / i;
  }

  return Math.round(res);
};

console.log(uniquePaths(7, 3));
