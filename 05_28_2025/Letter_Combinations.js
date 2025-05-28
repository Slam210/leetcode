/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) return [];

  const digitMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  function backtrack(index, combination) {
    // If we've processed all digits
    if (index === digits.length) {
      result.push(combination);
      return;
    }

    const letters = digitMap[digits[index]];

    for (let char of letters) {
      backtrack(index + 1, combination + char);
    }
  }

  backtrack(0, "");
  return result;
};
