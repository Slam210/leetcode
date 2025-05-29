/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  // Handle divisor 1 and -1 for fast exit
  if (divisor === 1) return dividend;
  if (divisor === -1) {
    if (dividend === INT_MIN) return INT_MAX;
    return -dividend;
  }

  const retIsNegative = dividend < 0 !== divisor < 0;
  let a = Math.abs(dividend);
  let b = Math.abs(divisor);
  let ret = 0;

  while (a >= b) {
    let value = b;
    let multiple = 1;

    // Safe doubling condition to prevent overflow
    while (value <= a >> 1) {
      // equivalent to (value << 1) <= a but safer
      value <<= 1;
      multiple <<= 1;
    }

    a -= value;
    ret += multiple;
  }

  ret = retIsNegative ? -ret : ret;

  if (ret > INT_MAX) return INT_MAX;
  if (ret < INT_MIN) return INT_MIN;

  return ret;
};

console.log(divide(10, 3));
