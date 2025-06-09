/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (n, k) {
  function countSteps(n, prefix, nextPrefix) {
    let steps = 0;
    while (prefix <= n) {
      steps += Math.min(n + 1, nextPrefix) - prefix;
      prefix *= 10;
      nextPrefix *= 10;
    }
    return steps;
  }

  let current = 1;
  k = k - 1;

  while (k > 0) {
    let steps = countSteps(n, current, current + 1);
    if (steps <= k) {
      current += 1;
      k -= steps;
    } else {
      current *= 10;
      k -= 1;
    }
  }

  return current;
};

console.log(findKthNumber(10, 3));
