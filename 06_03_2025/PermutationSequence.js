/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
  const factorial = [1];
  for (let i = 1; i <= n; i++) {
    factorial[i] = factorial[i - 1] * i;
  }

  const numbers = [];
  for (let i = 1; i <= n; i++) {
    numbers.push(i.toString());
  }

  k--;

  let result = "";

  for (let i = n; i >= 1; i--) {
    const index = Math.floor(k / factorial[i - 1]);
    result += numbers[index];
    numbers.splice(index, 1);
    k %= factorial[i - 1];
  }
};

console.log(getPermutation(4, 9));
