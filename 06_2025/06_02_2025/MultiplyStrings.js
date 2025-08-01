/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === 0 || num2 === 0) return "0";

  const m = num1.length,
    n = num2.length;

  const result = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    const digit1 = num1[i] - "0";
    for (let j = n - 1; j >= 0; j--) {
      const digit2 = num2[j] - "0";
      const product = digit1 * digit2;
      const sum = product + result[i + j + 1];

      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }

  let resultStr = result.join("");
  while (resultStr[0] === "0") {
    resultStr = resultStr.slice(1);
  }

  return resultStr;
};

console.log(multiply("123", "456"));
