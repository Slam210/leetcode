/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const isNegative = x < 0;
  // Deal with negative, convert to string, split into array, reverse, and then join
  let reversedStr = Math.abs(x).toString().split("").reverse().join("");
  let reversed = parseInt(reversedStr);

  if (reversed > 2 ** 31 - 1) return 0;

  return isNegative ? -reversed : reversed;
};

const number = 123;
const result = reverse(number);
console.log(result);
