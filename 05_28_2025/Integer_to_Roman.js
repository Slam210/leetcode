/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const valToRoman = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  for (const [value, roman] of valToRoman) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }

  return result;
};

const number = 2025;
const result = intToRoman(number);
console.log(result);
